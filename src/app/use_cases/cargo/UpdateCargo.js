const Operation = require("../../Operation");

class UpdateCargo extends Operation {
  constructor(cargosRepository) {
    super();
    this.cargosRepository = cargosRepository;
  }

  async execute(id, newData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const cargo = await this.cargosRepository.update(
        id,
        newData
      );
      this.emit(SUCCESS, cargo);
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

UpdateCargo.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = UpdateCargo;
