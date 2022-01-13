const Operation = require("../../Operation");

class GetAllTransactions extends Operation {
  constructor(transactionsRepository) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const transactions = await this.transactionsRepository.getAll();
      this.emit(SUCCESS, transactions);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllTransactions.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllTransactions;
