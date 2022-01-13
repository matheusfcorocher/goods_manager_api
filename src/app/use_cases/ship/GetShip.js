const Operation = require("../../Operation");

class GetShip extends Operation {
  constructor(shipsRepository) {
    super();
    this.shipsRepository = shipsRepository;
  }

  async execute(certification) {
    const { SUCCESS, NOT_FOUND} = this.outputs;

    try {
      const ship = await this.shipsRepository.getByPilotCertification(certification);
      this.emit(SUCCESS, ship);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }
}

GetShip.setOutputs(["SUCCESS", "NOT_FOUND"]);

module.exports = GetShip;
