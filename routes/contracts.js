const {
  getAllContractsSchema,
  getContractsSchema,
  postContractsSchema,
  updateContractsSchema,
  deleteContractsSchema,
} = require("../controllers/schemas/contracts.js");
const {
  getAllContractsHandler,
  getContractsHandler,
  postContractsHandler,
  updateContractsHandler,
  deleteContractsHandler,
} = require("../controllers/handlers/contracts.js");

const getAllContractssOpts = {
  schema: getAllContractsSchema,
  handler: getAllContractsHandler,
};

const getContractsOpts = {
  schema: getContractsSchema,
  handler: getContractsHandler,
};

const postContractsOpts = {
  schema: postContractsSchema,
  handler: postContractsHandler,
};

const updateContractsOpts = {
  schema: updateContractsSchema,
  handler: updateContractsHandler,
};

const deleteContractsOpts = {
  schema: deleteContractsSchema,
  handler: deleteContractsHandler,
};

const contractsRoutes = (fastify, options, done) => {
  fastify.get("/api/contracts", getAllContractssOpts);
  fastify.get("/api/contracts/:id", getContractsOpts);
  fastify.post("/api/contracts/new", postContractsOpts);
  fastify.put('/api/contracts/edit/:id', updateContractsOpts);
  fastify.delete('/api/contracts/:id', deleteContractsOpts);

  done();
};

module.exports = contractsRoutes;
