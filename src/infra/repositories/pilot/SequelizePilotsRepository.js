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
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Pilot with pilotCertification ${certification} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  async getByPilotCertification(certification) {
    const pilot = await this._getByPilotCertification(certification);
    return PilotMapper.toEntity(pilot);
  }
}

module.exports = SequelizePilotsRepository;
