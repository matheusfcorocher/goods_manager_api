const Contract = require("../../../domain/entities/Contract");

class PublishContract {
  constructor(contractsRepository) {
    this.contractRepository = contractsRepository;
  }

  async execute(contractData) {
    const contract = new Contract(contractData);
    try {
      contract.setStatusToCreated();
      
      if(contract.isValidContractPlanets()) {
        await this.contractRepository.add(contract);
        return "Contract was added successfully!"
      }

      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors =
        "The origin planet or destination planet is invalid.";
      throw validationError;
    } catch (error) {
      if (!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error;
    }
  }
}

module.exports = PublishContract;
