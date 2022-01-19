const { isValidPlanet } = require("../../../domain/entities/Planet");
const TravelFuelCostDomainService = require("../../../domain/services/TravelFuelCostDomainService");

class TravelPilot {
  constructor(pilotsRepository, shipsRepository) {
    this.pilotsRepository = pilotsRepository;
    this.shipsRepository = shipsRepository;
  }

  async execute(certification, { destinationPlanet }) {
    try {
      if (!isValidPlanet(destinationPlanet)) {
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Destination planet is unknown.`;
        throw validationError;
      }
      const { locationPlanet } =
        await this.pilotsRepository.getByPilotCertification(certification);
      const { fuelLevel } = await this.shipsRepository.getByPilotCertification(
        certification
      );

      const fuelCost = TravelFuelCostDomainService(
        locationPlanet,
        destinationPlanet
      );
      if (fuelLevel >= fuelCost) {
        await this.shipsRepository.update(certification, {
          fuelLevel: fuelLevel - fuelCost,
        });
        const updatedPilot = await this.pilotsRepository.update(certification, {
          locationPlanet: destinationPlanet,
        });

        return updatedPilot;
      }

      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = `Ship doesn't have enough fuel to travel to destination planet.`;
      throw validationError;
    } catch (error) {
      if (!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error;
    }
  }
}

module.exports = TravelPilot;
