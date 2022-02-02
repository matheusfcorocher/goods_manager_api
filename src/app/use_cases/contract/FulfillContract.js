const Transaction = require("../../../domain/entities/Transaction");
class FulfillContract {
  constructor({contractsRepository, pilotsRepository, transactionsRepository}) {
    this.contractsRepository = contractsRepository;
    this.pilotsRepository = pilotsRepository;
    this.transactionsRepository = transactionsRepository;
  }

  async _emitTransaction(contractId, value) {
    const about = `Contract ${contractId} Description paid: -₭${value}`;
    const transaction = new Transaction({ about: about });
    await this.transactionsRepository.add(transaction);
  }

  async execute(contractId) {
    try {
      const contract = await this.contractsRepository.getById(contractId);
      const pilot = await this.pilotsRepository.getByPilotCertification(
        contract.pilotCertification
      );
      if (
        contract.isInProgress() &&
        pilot.locationPlanet === contract.destinationPlanet
      ) {
        await this.contractsRepository.update(contractId, {
          contractStatus: "FINISHED",
        });
        await this.pilotsRepository.update(contract.pilotCertification, {
          credits: pilot.credits + contract.value,
        });
        await this._emitTransaction(contractId, contract.value);
        return "Contract was fullfilled!";
      }

      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = `Contract ${contractId} is not in progress or the location of pilot isn't the same as the destination planet of contract.`;
      throw validationError;
    } catch (error) {
      if(!error.CODE) {
        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;
        throw internalError;
      }
      throw error;
    }
  }
}

module.exports = FulfillContract;
