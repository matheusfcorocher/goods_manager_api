const Operation = require("../../Operation");

class GetAllPilots extends Operation {
  constructor(pilotsRepository) {
    super();
    this.pilotsRepository = pilotsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const pilots = await this.pilotsRepository.getAll();
      this.emit(SUCCESS, pilots);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllPilots.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllPilots;
