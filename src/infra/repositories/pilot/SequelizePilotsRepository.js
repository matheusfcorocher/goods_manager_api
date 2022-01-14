const PilotMapper = require("./SequelizePilotMapper");
class SequelizePilotsRepository {
  constructor(PilotModel) {
    this.PilotModel = PilotModel;
  }

  // Private

  async _getByPilotCertification(certification) {
    try {
      return await this.PilotModel.findOne({
        where: { pilotCertification: certification },
        // raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification ${certification} can't be found.`;
        throw notFoundError;
      }

      throw error;
    }
  }

  // Public

  async add(pilot) {
    const { valid, errors } = pilot.validate();

    if (!valid) {
      const validationError = new Error("Validation error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = errors;
      throw validationError;
    }

    const newPilot = await this.PilotModel.create(
      PilotMapper.toDatabase(pilot)
    );
    return PilotMapper.toEntity(newPilot);
  }

  async getAll() {
    const pilots = await this.PilotModel.findAll();

    return pilots.map(PilotMapper.toEntity);
  }

  async getByPilotCertification(certification) {
    const pilot = await this._getByPilotCertification(certification);
    return PilotMapper.toEntity(pilot);
  }

  async remove(certification) {
    const pilot = await this._getByPilotCertification(certification);

    await pilot.destroy();
    return;
  }

  async update(certification, newData) {
    const pilot = await this._getByPilotCertification(certification);

    const transaction = await this.PilotModel.sequelize.transaction();

    try {
      const updatedPilot = await pilot.update(newData, {
        transaction: transaction,
      });
      const pilotEntity = PilotMapper.toEntity(updatedPilot);

      const { valid, errors } = pilotEntity.validate();

      if (!valid) {
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = errors;
        throw validationError;
      }

      await transaction.commit();

      return pilotEntity;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }

  async travel(ship, destinationPlanet, travelFuelCost) {
    const { pilotCertification, fuelLevel } = ship;
    const pilot = await this._getByPilotCertification(pilotCertification);
    const transaction = await this.PilotModel.sequelize.transaction();

    try {
      const fuelCost = travelFuelCost(
        pilot.locationPlanet,
        destinationPlanet
      );
      if (fuelLevel >= fuelCost) {
        const updatedPilot = await pilot.update(
          { locationPlanet: destinationPlanet },
          { transaction: transaction }
        );
        await ship.update(
          { fuelLevel: fuelLevel - fuelCost },
          { transaction: transaction }
        );
        const pilotEntity = PilotMapper.toEntity(updatedPilot);
        const { valid, errors } = pilotEntity.validate();

        if (!valid) {
          const validationError = new Error("Validation error");
          validationError.CODE = "VALIDATION_ERROR";
          validationError.errors = errors;
          throw validationError;
        }
        await transaction.commit();
        return pilotEntity;
      }

      const validationError = new Error("Validation error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = `Ship doesn't have enough fuel to travel to destination planet.`;
      throw validationError;
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}

module.exports = SequelizePilotsRepository;
