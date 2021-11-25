const models = require("../../models/index.js");
const Transactions = models.Transactions;

const getAllTransactionsHandler = async (req, reply) => {
  const transactions = await Transactions.findAll();
  reply.send(transactions);
};

const getTransactionHandler = async (req, reply) => {
  const { id } = req.params;

  const transaction = await Transactions.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(transaction).length === 0) {
    return reply.status(404).send({
      errorMsg: "Transaction not found",
    });
  }

  reply.send(transaction[0]);
};

const postTransactionHandler = async (req, reply) => {
  const { about } = req.body;

  await Transactions.create({ about });

  reply.send("Transaction added!");
};

const updateTransactionHandler = async (req, reply) => {
  const { about } = req.body;
  const { id } = req.params;

  const transaction = await Transactions.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(transaction).length === 0) {
    return reply.status(404).send({
      errorMsg: "Transaction not found!",
    });
  }

  await Transactions.update(
    {
      about
    },
    {
      where: {
        id,
      },
    }
  );

  reply.send("Transaction updated!");
};

const deleteTransactionHandler = async (req, reply) => {
  const { id } = req.params;

  const transaction = await Transactions.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(transaction).length === 0) {
    return reply.status(404).send(new Error("Transaction not found"));
  }

  await Transactions.destroy({
    where: {
      id,
    },
  });

  return reply.send("Transaction deleted!");
};

module.exports = {
  getAllTransactionsHandler,
  getTransactionHandler,
  postTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
};
