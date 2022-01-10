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

  async getById(cargoId) {
    const packages = await this._getById(cargoId);

    return CargoMapper.toEntity(packages);
  }
}

module.exports = SequelizeCargosRepository;
