const Contract = require("../../../domain/entities/Contract");

class PublishContract {
  constructor(contractsRepository, cargoRepository) {
    this.contractRepository = contractsRepository;
    this.cargoRepository = cargoRepository;
  }

  async execute(contractData) {
    const contract = new Contract(contractData);
    try {
      contract.setStatusToCreated();
      
      if(contract.isValidContractPlanets()) {
        await this.cargoRepository.getById(contract.cargoId);
        await this.contractRepository.add(contract);
        return "Contract was added successfully!"
      }

      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors =
        "The origin planet or destination planet is invalid.";
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

module.exports = PublishContract;
