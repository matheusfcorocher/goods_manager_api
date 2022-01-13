const Operation = require("../../Operation");

class UpdateShip extends Operation {
  constructor(shipsRepository) {
    super();
    this.shipsRepository = shipsRepository;
  }

  async execute(certification, newData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const ship = await this.shipsRepository.update(
        certification,
        newData
      );
      this.emit(SUCCESS, ship);
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

UpdateShip.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = UpdateShip;
