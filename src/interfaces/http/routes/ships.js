const {
  createShipSchema,
  refillShipSchema
} = require("../controllers/schemas/ships.js");

const {
  createShipHandler,
  refillShipHandler
} = require("../controllers/handlers/ships.js");

const createShipOpts = {
  schema: createShipSchema,
  handler: createShipHandler,
};

const refillShipOpts = {
  schema: refillShipSchema,
  handler: refillShipHandler,
};

const shipsRoutes = (fastify, options, done) => {
  fastify.post("/api/ships/create", createShipOpts);
  fastify.put("/api/ships/refill/:pilotCertification", refillShipOpts);
  done();
};

module.exports = shipsRoutes;
