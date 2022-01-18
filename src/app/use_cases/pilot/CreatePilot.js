const Pilot = require('../../../domain/entities/Pilot');
const { isValidPlanet } = require('../../../domain/entities/Planet');

class CreatePilot {
  constructor(pilotsRepository) {
    this.pilotsRepository = pilotsRepository;
  }

  async execute(pilotData) {
    try {
      const pilot = new Pilot(pilotData);
      if(!pilot.isLegal() || !isValidPlanet(pilot.locationPlanet)) {
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = "Pilot doesn't fit the minimum age for a license or location planet is unknown.";
        throw validationError;
      }
      return await this.pilotsRepository.add(pilot);
    } catch(error) {
      if(!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error;
    }
  }
}

module.exports = CreatePilot;