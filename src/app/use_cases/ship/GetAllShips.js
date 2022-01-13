const Operation = require("../../Operation");

class GetAllShips extends Operation {
  constructor(shipsRepository) {
    super();
    this.shipsRepository = shipsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const ships = await this.shipsRepository.getAll();
      this.emit(SUCCESS, ships);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllShips.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllShips;
