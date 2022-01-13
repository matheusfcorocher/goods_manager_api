const Operation = require("../../Operation");

class DeleteShip extends Operation {
  constructor(shipsRepository) {
    super();
    this.shipsRepository = shipsRepository;
  }

  async execute(certification) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;

    try {
      const ship = await this.shipsRepository.remove(
        certification
      );
      this.emit(SUCCESS, ship);
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

DeleteShip.setOutputs(["SUCCESS", "NOT_FOUND", "ERROR"]);

module.exports = DeleteShip;
