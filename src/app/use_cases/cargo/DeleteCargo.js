const Operation = require("../../Operation");

class DeleteCargo extends Operation {
  constructor(cargosRepository) {
    super();
    this.cargosRepository = cargosRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;

    try {
      const cargo = await this.cargosRepository.remove(
        id
      );
      this.emit(SUCCESS, cargo);
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

DeleteCargo.setOutputs(["SUCCESS", "NOT_FOUND", "ERROR"]);

module.exports = DeleteCargo;
