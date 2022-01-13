const Operation = require("../../Operation");

class GetAllContracts extends Operation {
  constructor(contractsRepository) {
    super();
    this.contractsRepository = contractsRepository;
  }

  async execute(contractStatus) {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const contracts = await this.contractsRepository.getAll(contractStatus);
      this.emit(SUCCESS, contracts);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllContracts.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllContracts;
