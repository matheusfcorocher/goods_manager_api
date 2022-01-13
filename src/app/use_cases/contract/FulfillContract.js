// const { isPossibleToShipCarry } = require("../../../../core_rules/ship/rules");
// const { makeGetCargoWeightPilot, makeGetCargoWeightContract } = require("../../cargo");
const Transaction = require("../../../domain/entities/Transaction");
const Operation = require("../../Operation");

class FulfillContract extends Operation {
  constructor(
    contractsRepository,
    pilotsRepository,
    transactionsRepository
  ) {
    super();
    this.contractsRepository = contractsRepository;
    this.pilotsRepository = pilotsRepository;
    this.transactionsRepository = transactionsRepository;
  }

  async execute(contractId) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const contract = await this.contractsRepository.getById(contractId);
      const pilot = await this.pilotsRepository.getByPilotCertification(contract.pilotCertification);
      if (contract.isInProgress() && pilot.locationPlanet === contract.destinationPlanet) {
        await this.contractsRepository.update(contractId, { 
          contractStatus: "FINISHED"
        });
        await this.pilotsRepository.update(contract.pilotCertification, { 
          credits: pilot.credits + contract.value
        });
        const about = `Contract ${contractId} Description paid: -₭${contract.value}`;
        const transaction = new Transaction({about: about});
        await this.transactionsRepository.add(transaction);
        this.emit(SUCCESS, "Contract was fullfilled!");
      }
      this.emit(ERROR, `Contract ${contractId} is not in progress or the location of pilot isn't the same as the destination planet of contract.`);
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

FulfillContract.setOutputs([
  "SUCCESS",
  "NOT_FOUND",
  "VALIDATION_ERROR",
  "ERROR",
]);

module.exports = FulfillContract;
