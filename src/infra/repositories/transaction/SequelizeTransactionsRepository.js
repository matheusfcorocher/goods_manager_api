const TransactionMapper = require("./SequelizeTransactionMapper");

class SequelizeTransactionsRepository {
  constructor(TransactionModel) {
    this.TransactionModel = TransactionModel;
  }

  // Private

  async _getById(id) {
    try {
      return await this.TransactionModel.findOne({
        where: { id: id },
        // raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Transaction with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  // Public

  async add(transaction) {
    const { valid, errors } = transaction.validate();

    if (!valid) {
      const validationError = new Error("Validation error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = errors;

      throw validationError;
    }

    const newTransaction = await this.TransactionModel.create(
      TransactionMapper.toDatabase(transaction)
    );
    return TransactionMapper.toEntity(newTransaction);
  }

  async getAll() {
    const transactions = await this.TransactionModel.findAll();

    return transactions.map(TransactionMapper.toEntity);
  }

  async getById(id) {
    const transaction = await this._getById(id);
    return TransactionMapper.toEntity(transaction);
  }
}

module.exports = SequelizeTransactionsRepository;
