const CargoMapper = require("./SequelizeCargoMapper");

class SequelizeCargosRepository {
  constructor(CargoModel) {
    this.CargoModel = CargoModel;
  }

  // Private

  async _getById(cargoId) {
    try {
      return await this.CargoModel.findAll({
        where: {
          cargoId: cargoId,
        },
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Cargo with cargoId ${cargoId} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  // Public

  async add(cargo) {
    const { valid, errors } = cargo.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newCargo = await this.CargoModel.create(CargoMapper.toDatabase(cargo));
    return CargoMapper.toEntity(newCargo);
  }

  async getAll() {
    const cargos = await this.CargoModel.findAll();

    return cargos.map(CargoMapper.toEntity);
  }

  async getById(cargoId) {
    const packages = await this._getById(cargoId);

    return CargoMapper.toEntity(packages);
  }

  async getByRealId(id) {
    const cargo = await this._getByRealId(id);
    return CargoMapper.toEntity(cargo);
  }

  async remove(id) {
    const cargo = await this._getByRealId(id);
    
    await cargo.destroy();
    return;
  }

  async update(id, newData) {
    const cargo = await this._getByRealId(id);
    
    const transaction = await this.CargoModel.sequelize.transaction();

    try {
      console.log(cargo)
      const updatedCargo = await cargo.update(newData, { transaction: transaction });
      const cargoEntity = CargoMapper.toEntity(updatedCargo);

      const { valid, errors } = cargoEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();

      return cargoEntity;
    } catch(error) {
      console.log(error)
      await transaction.rollback();

      throw error;
    }
  }
}

module.exports = SequelizeCargosRepository;
