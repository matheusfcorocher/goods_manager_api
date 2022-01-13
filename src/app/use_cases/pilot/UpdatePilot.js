const Operation = require("../../Operation");

class UpdatePilot extends Operation {
  constructor(pilotsRepository) {
    super();
    this.pilotsRepository = pilotsRepository;
  }

  async execute(certification, newData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const pilot = await this.pilotsRepository.update(
        certification,
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

UpdatePilot.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = UpdatePilot;
