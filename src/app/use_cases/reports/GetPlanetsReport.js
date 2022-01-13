const Planets = require("../../../domain/entities/Planet");
const { makeGetAllResourcesContract } = require("../../cargo");

class GetPlanetsReport {
  constructor(cargosRepository, contractsRepository, resourcesRepository) {
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  _reportFormat() {
    let planets = Object.keys(Planets).map((key) => Planets[key]);
    let planetsReport = {};

    planets.map((p) => {
      planetsReport[p] = {
        sent: {
          water: 0,
          food: 0,
          minerals: 0,
        },
        received: {
          water: 0,
          food: 0,
          minerals: 0,
        },
      };
    });

    return planetsReport;
  }

  async execute() {
    try {
      const contracts = (await this.contractsRepository.getAll()).filter(
        (c) => !c.isCreated()
      );

      const getAllResourcesContract = makeGetAllResourcesContract(
        this.cargosRepository,
        this.contractsRepository,
        this.resourcesRepository
      );

      let planetsReport = this._reportFormat();

      for (let contract of contracts) {
        const { food, minerals, water } = await getAllResourcesContract(contract.cargoId);
        const { destinationPlanet, originPlanet } = contract;
        if (contract.isFinished()) {
          planetsReport[destinationPlanet] = {
            ...planetsReport[destinationPlanet],
            received: {
              food: food + planetsReport[destinationPlanet].received.food,
              water: water + planetsReport[destinationPlanet].received.water,
              minerals:
                minerals + planetsReport[destinationPlanet].received.minerals,
            },
          };
        }
        planetsReport[originPlanet] = {
          ...planetsReport[originPlanet],
          sent: {
            food: food + planetsReport[originPlanet].sent.food,
            water: water + planetsReport[originPlanet].sent.water,
            minerals: minerals + planetsReport[originPlanet].sent.minerals,
          },
        };
      }
      return planetsReport;
    } catch (error) {
      const internalError = new Error("Internal error");
      internalError.CODE = "INTERNAL_ERROR";
      throw internalError;
    }
  }
}

module.exports = GetPlanetsReport;
