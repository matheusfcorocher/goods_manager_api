const { compareValues } = require("../../../../helpers");
const {
  makeGetAllResourcesPilot,
} = require("../../cargo");

class GetPilotsReport {
  constructor(
    cargosRepository,
    contractsRepository,
    pilotsRepository,
    resourcesRepository
  ) {
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.pilotsRepository = pilotsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  _getPercentage(numerator, denominator) {
    return parseFloat(((numerator / denominator)*100).toFixed(2))
  }

  _reportFormat(pilot) {
    return {
      id: pilot.id,
      pilotCertification: pilot.pilotCertification,
      transporting: {
        water: 0,
        food: 0,
        minerals: 0,
      },
    };
  }


  async execute() {
    try {
      const getAllResourcesPilot = makeGetAllResourcesPilot(
        this.cargosRepository,
        this.contractsRepository,
        this.resourcesRepository
      );

      let pilots = (await this.pilotsRepository.getAll()).map((p) =>
        this._reportFormat(p)
      );

      for (let pilot of pilots) {
        const { food, minerals, water } = await getAllResourcesPilot(
          pilot.pilotCertification
        );
        let total = food + minerals + water;
        if (total != 0) {
          pilot.transporting.water = this._getPercentage(water, total);
          pilot.transporting.food = this._getPercentage(food, total);
          pilot.transporting.minerals = this._getPercentage(minerals, total);
        }
      }
      return pilots.sort(compareValues("id", "asc"));
    } catch (error) {
      const internalError = new Error("Internal error");
      internalError.CODE = "INTERNAL_ERROR";
      throw internalError;
    }
  }
}

module.exports = GetPilotsReport;
