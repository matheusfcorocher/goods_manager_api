const ShipMapper = require("./SequelizeShipMapper");

class SequelizeShipsRepository {
  constructor(ShipModel) {
    this.ShipModel = ShipModel;
  }

  // Private

  async _getByPilotCertification(certification) {
    try {
      return await this.ShipModel.findOne({
        where: { pilotCertification: certification },
        // raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Ship with shipCertification ${certification} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  async _hasShip(certification) {
    try {
      await this.ShipModel.findOne({
        where: { pilotCertification: certification },
        // raw: true,
        rejectOnEmpty: true,
      });
      return true 
    } catch (error) {
      return false
    }
  }

  // Public

  async add(ship) {
    const { valid, errors } = ship.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newShip = await this.ShipModel.create(ShipMapper.toDatabase(ship));
    return ShipMapper.toEntity(newShip);
  }

  async getAll() {
    const ships = await this.ShipModel.findAll();

    return ships.map(ShipMapper.toEntity);
  }

  async getByPilotCertification(certification) {
    const ship = await this._getByPilotCertification(certification);
    return ShipMapper.toEntity(ship);
  }

  async hasShip(certification) {
    const hasShip = await this._hasShip(certification);
    return hasShip;
  }

  async remove(certification) {
    const ship = await this._getByPilotCertification(certification);
    
    await ship.destroy();
    return;
  }
  
  async update(certification, newData) {
    const ship = await this._getByPilotCertification(certification);
    
    const transaction = await this.ShipModel.sequelize.transaction();

    try {
      const updatedShip = await ship.update(newData, { transaction: transaction });
      const shipEntity = ShipMapper.toEntity(updatedShip);

      const { valid, errors } = shipEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();

      return shipEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

}

module.exports = SequelizeShipsRepository;
