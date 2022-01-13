const { compareValues, getPercentage } = require("../../../../helpers");
const {
  makeGetAllResourcesContract,
  makeGetAllResourcesPilot,
} = require("../../cargo");
const Operation = require("../../Operation");

class GetPilotsReport extends Operation {
  constructor(
    cargosRepository,
    contractsRepository,
    pilotsRepository,
    resourcesRepository
  ) {
    super();
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.pilotsRepository = pilotsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const getAllResourcesPilot = makeGetAllResourcesPilot(
        this.cargosRepository,
        this.contractsRepository,
        this.resourcesRepository
      );

      let pilots = (await this.pilotsRepository.getAll()).map((p) => {
        return {
          id: p.id,
          pilotCertification: p.pilotCertification,
          transporting: {
            water: 0,
            food: 0,
            minerals: 0,
          },
        };
      });
      for (let pilot of pilots) {
        const { food, minerals, water } = await getAllResourcesPilot(
          pilot.pilotCertification
        );
        let total = food + minerals + water;
        if(total != 0) {
            pilot.transporting.water = getPercentage(water, total);
            pilot.transporting.food = getPercentage(food, total);
            pilot.transporting.minerals = getPercentage(minerals, total);
        }
      }
      this.emit(SUCCESS, pilots.sort(compareValues("id", "asc")));
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetPilotsReport.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetPilotsReport;
