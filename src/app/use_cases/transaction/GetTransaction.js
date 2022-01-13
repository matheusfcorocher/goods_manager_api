const Operation = require("../../Operation");

class GetTransaction extends Operation {
  constructor(transactionsRepository) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND} = this.outputs;

    try {
      const transaction = await this.transactionsRepository.getById(id);
      this.emit(SUCCESS, transaction);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }
}

GetTransaction.setOutputs(["SUCCESS", "NOT_FOUND"]);

module.exports = GetTransaction;
