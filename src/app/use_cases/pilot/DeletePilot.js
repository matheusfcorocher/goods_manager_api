const Operation = require("../../Operation");

class DeletePilot extends Operation {
  constructor(pilotsRepository) {
    super();
    this.pilotsRepository = pilotsRepository;
  }

  async execute(certification) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;

    try {
      const pilot = await this.pilotsRepository.remove(
        certification
      );
      this.emit(SUCCESS, pilot);
    } catch (error) {
      switch (error.message) {
        case "NotFoundError":
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

DeletePilot.setOutputs(["SUCCESS", "NOT_FOUND", "ERROR"]);

module.exports = DeletePilot;
