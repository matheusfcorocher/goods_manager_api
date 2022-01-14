const { isValidPlanet } = require("../../../domain/entities/Planet");

class TravelPilot {
  constructor(pilotsRepository, shipsRepository) {
    this.pilotsRepository = pilotsRepository;
    this.shipsRepository = shipsRepository;
  }

  _travelFuelCost(originPlanet, planetDestination) {
    const standardRoutes = {
      Andvari: {
        Andvari: 0,
        Demeter: null,
        Aqua: 13,
        Calas: 23,
      },
      Demeter: {
        Andvari: null,
        Demeter: 0,
        Aqua: 22,
        Calas: 25,
      },
      Aqua: {
        Andvari: null,
        Demeter: 30,
        Aqua: 0,
        Calas: 12,
      },
      Calas: {
        Andvari: 20,
        Demeter: 25,
        Aqua: 15,
        Calas: 0,
      },
    };
  
    if (standardRoutes[originPlanet][planetDestination] === null) {
      const alternativesRoutes = {
        Andvari: {
          Demeter: 43,//Andvari->Aqua->Demeter
        },
        Demeter: {
          Andvari: 45,//Demeter->Calas->Andvari
        },
        Aqua: {
          Andvari: 32,//Aqua->Calas->Andvari
        },
      };
  
      return alternativesRoutes[originPlanet][planetDestination];
    }
  
    return standardRoutes[originPlanet][planetDestination];
  }

  async execute(certification, {destinationPlanet}) {
    try {
      if(!isValidPlanet(destinationPlanet)) {
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Destination planet is unknown.`;
        throw validationError;
      }
      const ship = await this.shipsRepository._getByPilotCertification(certification);
      const pilot = await this.pilotsRepository.travel(
        ship,
        destinationPlanet,
        this._travelFuelCost
      );
      return pilot
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TravelPilot;
