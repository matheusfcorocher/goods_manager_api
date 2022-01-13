const Operation = require("../../Operation");
const Ship = require("../../../domain/entities/Ship");

class CreateShip extends Operation {
  constructor(shipsRepository, pilotsRepository) {
    super();
    this.shipsRepository = shipsRepository;
    this.pilotsRepository = pilotsRepository;
  }

  async execute(shipData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const ship = new Ship(shipData);

    try {
      const hasPilot = await this.pilotsRepository.getByPilotCertification(
        shipData.pilotCertification
      );
      const hasShip = await this.shipsRepository.hasShip(
        shipData.pilotCertification
      );
      if (hasPilot && !hasShip) {
        const newShip = await this.shipsRepository.add(ship);
        this.emit(SUCCESS, newShip);
      }
      let e = `There's a ship with pilotCertification ${shipData.pilotCertification}!`;
      this.emit(VALIDATION_ERROR, e);
    } catch (error) {
      if (error.message === "Validation error") {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateShip.setOutputs(["SUCCESS", "ERROR", "VALIDATION_ERROR"]);

module.exports = CreateShip;
