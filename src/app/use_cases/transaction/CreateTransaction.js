const Operation = require('../../Operation');
const Transaction = require('../../../domain/entities/Transaction');

class CreateTransaction extends Operation {
  constructor(transactionsRepository) {
    super();
    this.transactionsRepository = transactionsRepository;
  }

  async execute(transactionData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const transaction = new Transaction(transactionData);

    try {
      const newTransaction = await this.transactionsRepository.add(transaction);

      this.emit(SUCCESS, newTransaction);
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Validation error') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateTransaction.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateTransaction;