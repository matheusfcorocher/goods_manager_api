const { isPossibleToShipCarry } = require("../../../../core_rules/ship/rules");
const { makeGetCargoWeightPilot, makeGetCargoWeightContract } = require("../../cargo");
const Operation = require("../../Operation");

class AcceptContract extends Operation {
  constructor(
    cargosRepository,
    contractsRepository,
    pilotsRepository,
    shipsRepository,
    resourcesRepository
  ) {
    super();
    this.cargosRepository = cargosRepository;
    this.contractsRepository = contractsRepository;
    this.pilotsRepository = pilotsRepository;
    this.shipsRepository = shipsRepository;
    this.resourcesRepository = resourcesRepository;
  }

  async execute(contractId, {pilotCertification}) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      let contract = await this.contractsRepository.getById(contractId);
      const pilot = await this.pilotsRepository.getByPilotCertification(pilotCertification);
      if (contract.isCreated() && pilot.locationPlanet === contract.originPlanet) {
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
        
        const cargoWeightPilot = await getCargoWeightPilot(pilotCertification)
        const cargoWeightContract = await getCargoWeightContract(contractId)
        if (
          isPossibleToShipCarry(
            ship.weightCapacity,
            cargoWeightPilot,
            cargoWeightContract
          )
        )
        contract = await this.contractsRepository.update(contractId, {
            pilotCertification: pilotCertification,
            contractStatus: "IN PROGRESS"
          });
          this.emit(SUCCESS, contract);
      }
      this.emit(ERROR, `Contract ${contractId} is already in progress or finished.`);
    } catch (error) {
      switch (error.message) {
        case "ValidationError":
          return this.emit(VALIDATION_ERROR, error);
        case "NotFoundError":
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

AcceptContract.setOutputs([
  "SUCCESS",
  "NOT_FOUND",
  "VALIDATION_ERROR",
  "ERROR",
]);

module.exports = AcceptContract;
