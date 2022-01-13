const {
  getAllTransactionsSchema,
  getTransactionSchema,
  postTransactionSchema,
  updateTransactionSchema,
  deleteTransactionSchema,
} = require("../controllers/schemas/transactions.js");
const {
  getAllTransactionsHandler,
  getTransactionHandler,
  postTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
} = require("../controllers/handlers/transactions.js");

const getAllTransactionsOpts = {
  schema: getAllTransactionsSchema,
  handler: getAllTransactionsHandler,
};

const getTransactionOpts = {
  schema: getTransactionSchema,
  handler: getTransactionHandler,
};

const postTransactionOpts = {
  schema: postTransactionSchema,
  handler: postTransactionHandler,
};

const updateTransactionOpts = {
  schema: updateTransactionSchema,
  handler: updateTransactionHandler,
};

const deleteTransactionOpts = {
  schema: deleteTransactionSchema,
  handler: deleteTransactionHandler,
};

const transactionsRoutes = (fastify, options, done) => {
  fastify.get("/api/transactions", getAllTransactionsOpts);
  fastify.get("/api/transactions/:id", getTransactionOpts);
  fastify.post("/api/transactions/new", postTransactionOpts);
  fastify.put('/api/transactions/edit/:id', updateTransactionOpts);
  fastify.delete('/api/transactions/:id', deleteTransactionOpts);

  done();
};

module.exports = transactionsRoutes;
