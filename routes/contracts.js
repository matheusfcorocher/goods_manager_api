const {
  getAllContractsSchema,
  getContractSchema,
  postContractSchema,
  updateContractSchema,
  deleteContractSchema,
} = require("../controllers/schemas/contracts.js");
const {
  getAllContractsHandler,
  getContractHandler,
  postContractHandler,
  updateContractHandler,
  deleteContractHandler,
} = require("../controllers/handlers/contracts.js");

const getAllContractsOpts = {
  schema: getAllContractsSchema,
  handler: getAllContractsHandler,
};

const getContractOpts = {
  schema: getContractSchema,
  handler: getContractHandler,
};

const postContractOpts = {
  schema: postContractSchema,
  handler: postContractHandler,
};

const updateContractOpts = {
  schema: updateContractSchema,
  handler: updateContractHandler,
};

const deleteContractOpts = {
  schema: deleteContractSchema,
  handler: deleteContractHandler,
};

const contractsRoutes = (fastify, options, done) => {
  fastify.get("/api/contracts", getAllContractsOpts);
  fastify.get("/api/contracts/:id", getContractOpts);
  fastify.post("/api/contracts/new", postContractOpts);
  fastify.put('/api/contracts/edit/:id', updateContractOpts);
  fastify.delete('/api/contracts/:id', deleteContractOpts);

  done();
};

module.exports = contractsRoutes;
