const {Planets} = require("../../../domain/entities/Planet");
const CargoAllResourcesDomainService = require("../../../domain/services/CargoAllResourcesDomainService");

class GetPlanetsReport {
  constructor(cargosRepository, contractsRepository, resourcesRepository) {
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  _reportFormat(Planets) {
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
      const cargoService = new CargoAllResourcesDomainService({
        cargoRepository: this.cargosRepository,
        contractRepository: this.contractsRepository,
        resourceRepository: this.resourcesRepository,
      });

      let planetsReport = this._reportFormat(Planets);

      for (let contract of contracts) {
        const { food, minerals, water } = await cargoService.getAllResourcesContract(contract.id);
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
      if(!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error;
    }
  }
}

module.exports = GetPlanetsReport;
