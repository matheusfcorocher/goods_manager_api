const Operation = require("../../Operation");

class UpdateTransaction extends Operation {
  constructor(transactionsRepository) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(id, newData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const transaction = await this.transactionsRepository.update(
        id,
        newData
      );
      this.emit(SUCCESS, transaction);
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

UpdateTransaction.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = UpdateTransaction;
