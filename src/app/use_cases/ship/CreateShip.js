const Ship = require("../../../domain/entities/Ship");

class CreateShip {
  constructor(shipsRepository, pilotsRepository) {
    this.shipsRepository = shipsRepository;
    this.pilotsRepository = pilotsRepository;
  }

  async execute(shipData) {
    const ship = new Ship(shipData);
    try {
      const hasPilot = await this.pilotsRepository.getByPilotCertification(
        shipData.pilotCertification
      );
      const hasShip = await this.shipsRepository.hasShip(
        shipData.pilotCertification
      );
      if (hasPilot && !hasShip) {
        return await this.shipsRepository.add(ship);
      }
      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = `There's a ship with pilotCertification ${shipData.pilotCertification}!`;
      throw validationError;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CreateShip;
