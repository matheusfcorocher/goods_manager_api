const Operation = require("../../Operation");

class GetAllCargos extends Operation {
  constructor(cargosRepository) {
    super();
    this.cargosRepository = cargosRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const cargos = await this.cargosRepository.getAll();
      this.emit(SUCCESS, cargos);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCargos.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllCargos;
