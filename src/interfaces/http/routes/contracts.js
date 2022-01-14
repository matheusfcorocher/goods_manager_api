const {
  acceptContractSchema,
  fulfillContractSchema,
  getAllContractsSchema,
  publishContractSchema,
} = require("../controllers/schemas/contracts.js");
const {
  acceptContractHandler,
  fulfillContractHandler,
  getAllContractsHandler,
  publishContractHandler,
} = require("../controllers/handlers/contracts.js");

const acceptContractOpts = {
  schema: acceptContractSchema,
  handler: acceptContractHandler,
};

const fulfillContractOpts = {
  schema: fulfillContractSchema,
  handler: fulfillContractHandler,
};

const getAllContractsOpts = {
  schema: getAllContractsSchema,
  handler: getAllContractsHandler,
};

const publishContractOpts = {
  schema: publishContractSchema,
  handler: publishContractHandler,
};

const contractsRoutes = (fastify, options, done) => {
  fastify.put("/api/contracts/accept/:id", acceptContractOpts);
  fastify.put("/api/contracts/fulfill/:id", fulfillContractOpts);
  fastify.get("/api/contracts", getAllContractsOpts);
  fastify.post("/api/contracts/publish", publishContractOpts);
  done();
};

module.exports = contractsRoutes;
