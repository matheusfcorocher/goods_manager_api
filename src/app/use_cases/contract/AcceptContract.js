const {
  makeGetCargoWeightPilot,
  makeGetCargoWeightContract,
} = require("../../cargo");
class AcceptContract {
  constructor(
    cargosRepository,
    contractsRepository,
    pilotsRepository,
    shipsRepository,
    resourcesRepository
  ) {
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.pilotsRepository = pilotsRepository;
    this.shipsRepository = shipsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  _isPossibleToShipCarry(shipCapacity, actualShipWeight, totalContractWeight) {
    return totalContractWeight + actualShipWeight <= shipCapacity;
  }

  async execute(contractId, { pilotCertification }) {
    try {
      let contract = await this.contractsRepository.getById(contractId);
      const pilot = await this.pilotsRepository.getByPilotCertification(
        pilotCertification
      );
      if (
        contract.isCreated() &&
        pilot.locationPlanet === contract.originPlanet
      ) {
        const ship = await this.shipsRepository.getByPilotCertification(
          pilotCertification
        );
        const getCargoWeightContract = makeGetCargoWeightContract(
          this.cargosRepository,
          this.contractsRepository,
          this.resourcesRepository
        );
        const getCargoWeightPilot = makeGetCargoWeightPilot(
          this.cargosRepository,
          this.contractsRepository,
          this.resourcesRepository
        );

        const cargoWeightPilot = await getCargoWeightPilot(pilotCertification);
        const cargoWeightContract = await getCargoWeightContract(contractId);
        if (
          this._isPossibleToShipCarry(
            ship.weightCapacity,
            cargoWeightPilot,
            cargoWeightContract
          )
        ) {
          contract = await this.contractsRepository.update(contractId, {
            pilotCertification: pilotCertification,
            contractStatus: "IN PROGRESS",
          });
          return contract;
        }
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `The ship can't carry the required weight of contract`;
        throw validationError;
      }
      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = `Contract ${contractId} isn't available or pilot isn't in the origin planet of contract.`;
      throw validationError;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AcceptContract;
