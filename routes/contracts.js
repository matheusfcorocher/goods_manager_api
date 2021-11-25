const {
  getAllContractsSchema,
  getContractSchema,
  postContractSchema,
  postContractsSchema,
  updateContractSchema,
  deleteContractSchema,
  acceptContractSchema,
  fulfillContractSchema,
} = require("../controllers/schemas/contracts.js");
const {
  getAllContractsHandler,
  getContractHandler,
  postContractHandler,
  postContractsHandler,
  updateContractHandler,
  deleteContractHandler,
  acceptContractHandler,
  fulfillContractHandler
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

const acceptContractOpts = {
  schema: acceptContractSchema,
  handler: acceptContractHandler,
};

const fulfillContractOpts = {
  schema: fulfillContractSchema,
  handler: fulfillContractHandler,
};

const postContractsOpts = {
  schema: postContractsSchema,
  handler: postContractsHandler,
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
  fastify.post("/api/contracts/news", postContractsOpts);
  fastify.put("/api/contracts/accept/:id", acceptContractOpts);
  fastify.put("/api/contracts/fulfill/:id", fulfillContractOpts);
  fastify.put('/api/contracts/edit/:id', updateContractOpts);
  fastify.delete('/api/contracts/:id', deleteContractOpts);

  done();
};

module.exports = contractsRoutes;
