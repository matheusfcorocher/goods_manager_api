const { makeGetAllResourcesContract } = require("../../cargo");
const Operation = require("../../Operation");

class GetPlanetsReport extends Operation {
  constructor(cargosRepository, contractsRepository, resourcesRepository) {
    super();
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const contracts = (await this.contractsRepository.getAll()).filter(
        (c) => !c.isCreated()
      );
      
      const getAllResourcesContract = makeGetAllResourcesContract(
        this.cargosRepository,
        this.contractsRepository,
        this.resourcesRepository
      );

      let planets = ["Andvaria", "Aqua", "Calas", "Demeter"];
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

      for (let contract of contracts) {
        const resources = await getAllResourcesContract(contract.cargoId);
        if (contract.isFinished()) {
          planetsReport[contract.destinationPlanet] = {
            ...planetsReport[contract.destinationPlanet],
            received: {
              food:
                resources.food +
                planetsReport[contract.destinationPlanet].received.food,
              water:
                resources.water +
                planetsReport[contract.destinationPlanet].received.water,
              minerals:
                resources.minerals +
                planetsReport[contract.destinationPlanet].received.minerals,
            },
          };
        }
        planetsReport[contract.originPlanet] = {
          ...planetsReport[contract.originPlanet],
          sent: {
            food:
              resources.food + planetsReport[contract.originPlanet].sent.food,
            water:
              resources.water + planetsReport[contract.originPlanet].sent.water,
            minerals:
              resources.minerals +
              planetsReport[contract.originPlanet].sent.minerals,
          },
        };
      }
      
      this.emit(SUCCESS, planetsReport);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetPlanetsReport.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetPlanetsReport;
