const Contract = require("../../../domain/entities/Contract");

class PublishContract {
  constructor(contractsRepository) {
    this.contractRepository = contractsRepository;
  }

  async execute(contractData) {
    const contract = new Contract(contractData);
    try {
      contract.setStatusToCreated();
      await this.contractRepository.add(contract);
    } catch (error) {
      if(!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error
    }
  }
}

module.exports = PublishContract;
