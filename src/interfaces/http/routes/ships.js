const {
  getAllShipsSchema,
  getShipSchema,
  postShipSchema,
  updateShipSchema,
  deleteShipSchema,
  refillShipSchema
} = require("../controllers/schemas/ships.js");

const {
  getAllShipsHandler,
  getShipHandler,
  postShipHandler,
  updateShipHandler,
  deleteShipHandler,
  refillShipHandler
} = require("../controllers/handlers/ships.js");

const getAllShipsOpts = {
  schema: getAllShipsSchema,
  handler: getAllShipsHandler,
};

const getShipOpts = {
  schema: getShipSchema,
  handler: getShipHandler,
};

const postShipOpts = {
  schema: postShipSchema,
  handler: postShipHandler,
};

const updateShipOpts = {
  schema: updateShipSchema,
  handler: updateShipHandler,
};

const refillShipOpts = {
  schema: refillShipSchema,
  handler: refillShipHandler,
};

const deleteShipOpts = {
  schema: deleteShipSchema,
  handler: deleteShipHandler,
};

const shipsRoutes = (fastify, options, done) => {
  fastify.get("/api/ships", getAllShipsOpts);
  fastify.get("/api/ships/:pilotCertification", getShipOpts);
  fastify.post("/api/ships/new", postShipOpts);
  fastify.put("/api/ships/edit/:pilotCertification", updateShipOpts);
  fastify.put("/api/ships/refill/:pilotCertification", refillShipOpts);
  fastify.delete("/api/ships/:pilotCertification", deleteShipOpts);
  done();
};

module.exports = shipsRoutes;
