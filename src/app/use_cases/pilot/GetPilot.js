const Operation = require("../../Operation");

class GetPilot extends Operation {
  constructor(pilotsRepository) {
    super();
    this.pilotsRepository = pilotsRepository;
  }

  async execute(certification) {
    const { SUCCESS, NOT_FOUND} = this.outputs;

    try {
      const pilot = await this.pilotsRepository.getByPilotCertification(certification);
      this.emit(SUCCESS, pilot);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }
}

GetPilot.setOutputs(["SUCCESS", "NOT_FOUND"]);

module.exports = GetPilot;
