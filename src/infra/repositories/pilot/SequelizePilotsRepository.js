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
}

module.exports = SequelizePilotsRepository;
