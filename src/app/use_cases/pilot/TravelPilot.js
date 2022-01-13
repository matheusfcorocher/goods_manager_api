const Operation = require("../../Operation");

class TravelPilot extends Operation {
  constructor(pilotsRepository, shipsRepository) {
    super();
    this.pilotsRepository = pilotsRepository;
    this.shipsRepository = shipsRepository;
  }

  async execute(certification, newData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const ship = await this.shipsRepository._getByPilotCertification(certification);
      const pilot = await this.pilotsRepository.travel(
        ship,
        newData
      );
      this.emit(SUCCESS, pilot);
    } catch (error) {
      switch (error.message) {
        case "ValidationError":
          return this.emit(VALIDATION_ERROR, error);
        case "NotFoundError":
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

TravelPilot.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = TravelPilot;
