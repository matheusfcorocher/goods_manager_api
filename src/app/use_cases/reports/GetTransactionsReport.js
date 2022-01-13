const Operation = require("../../Operation");

class GetTransactionsReport extends Operation {
  constructor(transactionsRepository) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const transactions = (await this.transactionsRepository.getAll()).map(t => t.about);
      this.emit(SUCCESS, transactions);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetTransactionsReport.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetTransactionsReport;
