const Operation = require("../../Operation");

class GetCargo extends Operation {
  constructor(cargosRepository) {
    super();
    this.cargosRepository = cargosRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND} = this.outputs;

    try {
      const cargo = await this.cargosRepository.getById(id);
      this.emit(SUCCESS, cargo);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }
}

GetCargo.setOutputs(["SUCCESS", "NOT_FOUND"]);

module.exports = GetCargo;
