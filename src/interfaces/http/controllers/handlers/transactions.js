const {
  CreateTransaction,
  GetAllTransactions,
  GetTransaction,
  UpdateTransaction,
  DeleteTransaction
} = require("../../../../app/use_cases/transaction/index.js");
const models = require("../../../../infra/database/models/index.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");
const TransactionSerializer = require("../serializers/TransactionSerializer.js");

const transactionModel = models.Transactions;
const transactionRepo = new SequelizeTransactionsRepository(transactionModel);

const getAllTransactionsHandler = async (req, reply) => {
  const getAllTransactions = new GetAllTransactions(transactionRepo);
  const { SUCCESS, ERROR } = getAllTransactions.outputs;
  getAllTransactions
    .on(SUCCESS, (transactions) => {
      reply.send(transactions);
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    });

  getAllTransactions.execute();
};

const getTransactionHandler = async (req, reply) => {
  const { id } = req.params;
  const getTransaction = new GetTransaction(transactionRepo);
  const { SUCCESS, NOT_FOUND} = getTransaction.outputs;
  getTransaction
    .on(SUCCESS, (transaction) => {
      reply.send(transaction);
    })
    .on(NOT_FOUND, (error) => {
      reply.status(404).send({
        errorMsg: error.errors[0].message,
      });
    })

  getTransaction.execute(id);
};

const postTransactionHandler = async (req, reply) => {
  const createTransaction = new CreateTransaction(transactionRepo);
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createTransaction.outputs;
  createTransaction
    .on(SUCCESS, (transaction) => {
      reply.send(`Transaction ${transaction.id} added!`);
    })
    .on(VALIDATION_ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    });

  createTransaction.execute(req.body);
};

const updateTransactionHandler = async (req, reply) => {
  const { id } = req.params;

  const updateTransaction = new UpdateTransaction(transactionRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = updateTransaction.outputs;

  updateTransaction
    .on(SUCCESS, (transaction) => {
      reply.send(TransactionSerializer.serialize(transaction));
    })
    .on(VALIDATION_ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(NOT_FOUND, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

  updateTransaction.execute(id, req.body);
};

const deleteTransactionHandler = async (req, reply) => {
  const { id } = req.params;

  const deleteTransaction = new DeleteTransaction(transactionRepo);
  const { SUCCESS, NOT_FOUND, ERROR} = deleteTransaction.outputs;

  deleteTransaction
    .on(SUCCESS, () => {
      reply.send("Transaction deleted!");
    })
    .on(NOT_FOUND, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

  deleteTransaction.execute(id);
};

module.exports = {
  getAllTransactionsHandler,
  getTransactionHandler,
  postTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
};
