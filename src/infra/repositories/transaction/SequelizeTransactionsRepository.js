const TransactionMapper = require("./SequelizeTransactionMapper");

class SequelizeTransactionsRepository {
  constructor(TransactionModel) {
    this.TransactionModel = TransactionModel;
  }

  // Private

  async _getById(id) {
    try {
      return await this.TransactionModel.findOne({
        where: { id: id},
        // raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Transaction with transactionCertification ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  // Public

  async add(transaction) {
    const { valid, errors } = transaction.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newTransaction = await this.TransactionModel.create(TransactionMapper.toDatabase(transaction));
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

  async remove(id) {
    const transaction = await this._getById(id);
    
    await transaction.destroy();
    return;
  }

  async update(id, newData) {
    const t = await this._getById(id);;
    
    const transaction = await this.TransactionModel.sequelize.transaction();

    try {
      const updatedTransaction = await t.update(newData, { transaction: transaction });
      const transactionEntity = TransactionMapper.toEntity(updatedTransaction);

      const { valid, errors } = transactionEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();

      return transactionEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

}

module.exports = SequelizeTransactionsRepository;
