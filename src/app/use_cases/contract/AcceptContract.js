const CargoWeightDomainService = require("../../../domain/services/CargoWeightDomainService");
class AcceptContract {
  constructor({
    cargosRepository = null,
    contractsRepository = null,
    pilotsRepository = null,
    shipsRepository = null,
    resourcesRepository = null}
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

        const cargoService = new CargoWeightDomainService({
          cargoRepository: this.cargosRepository,
          contractRepository: this.contractsRepository,
          resourceRepository: this.resourcesRepository,
        });
        const cargoWeightPilot = await cargoService.getCargoWeightPilot(
          pilotCertification
        );
        const cargoWeightContract = await cargoService.getCargoWeightContract(
          contractId
        );
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
      if(!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error;
    }
  }
}

module.exports = AcceptContract;
