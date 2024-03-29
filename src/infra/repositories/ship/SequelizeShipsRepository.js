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
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Ship with pilotCertification ${certification} can't be found.`;
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
      return true;
    } catch (error) {
      return false;
    }
  }

  // Public

  async add(ship) {
    const { valid, errors } = ship.validate();

    if (!valid) {
      const validationError = new Error("Validation error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = errors;
      throw validationError;
    }

    const newShip = await this.ShipModel.create(ShipMapper.toDatabase(ship));
    return ShipMapper.toEntity(newShip);
  }

  async getByPilotCertification(certification) {
    const ship = await this._getByPilotCertification(certification);
    return ShipMapper.toEntity(ship);
  }

  async hasShip(certification) {
    const hasShip = await this._hasShip(certification);
    return hasShip;
  }

  async update(certification, newData) {
    const ship = await this._getByPilotCertification(certification);

    const transaction = await this.ShipModel.sequelize.transaction();

    try {
      const updatedShip = await ship.update(newData, {
        transaction: transaction,
      });
      const shipEntity = ShipMapper.toEntity(updatedShip);

      const { valid, errors } = shipEntity.validate();

      if (!valid) {
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = errors;
        throw validationError;
      }

      await transaction.commit();

      return shipEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}

module.exports = SequelizeShipsRepository;
