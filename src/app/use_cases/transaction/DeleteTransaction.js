const Operation = require("../../Operation");

class DeleteTransaction extends Operation {
  constructor(transactionsRepository) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.outputs;

    try {
      const transaction = await this.transactionsRepository.remove(
        id
      );
      this.emit(SUCCESS, transaction);
    } catch (error) {
      switch (error.message) {
        case "NotFoundError":
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

DeleteTransaction.setOutputs(["SUCCESS", "NOT_FOUND", "ERROR"]);

module.exports = DeleteTransaction;
