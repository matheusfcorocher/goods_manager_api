const Pilot = require('../../../domain/entities/Pilot');

class CreatePilot {
  constructor(pilotsRepository) {
    this.pilotsRepository = pilotsRepository;
  }

  async execute(pilotData) {
    try {
      const pilot = new Pilot(pilotData);
      if(pilot.isLegal()) {
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = "Pilot doesn't fit the minimum age for a license.";
        throw validationError;
      }
      return await this.pilotsRepository.add(pilot);
    } catch(error) {
      throw error
    }
  }
}

module.exports = CreatePilot;