const Ship = require("../../../domain/entities/Ship");

class CreateShip {
  constructor(shipsRepository, pilotsRepository) {
    this.shipsRepository = shipsRepository;
    this.pilotsRepository = pilotsRepository;
  }

  async execute(shipData) {
    const ship = new Ship(shipData);
    try {
      await this.pilotsRepository.getByPilotCertification(
        shipData.pilotCertification
      );
      const hasShip = await this.shipsRepository.hasShip(
        shipData.pilotCertification
      );

      if(hasShip) {
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `There's a ship with pilotCertification ${shipData.pilotCertification}!`;
        throw validationError;
      }

      return await this.shipsRepository.add(ship);
      
    } catch (error) {
      if(!error.CODE) {
        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;
        throw internalError;
      }
      throw error;
    }
  }
}

module.exports = CreateShip;
