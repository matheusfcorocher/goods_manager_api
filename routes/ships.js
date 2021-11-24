const {
  getAllShipsSchema,
  getShipSchema,
  postShipSchema,
  updateShipSchema,
  deleteShipSchema,
} = require("../controllers/schemas/ships.js");

const {
  getAllShipsHandler,
  getShipHandler,
  postShipHandler,
  updateShipHandler,
  deleteShipHandler,
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

const deleteShipOpts = {
  schema: deleteShipSchema,
  handler: deleteShipHandler,
};

const shipsRoutes = (fastify, options, done) => {
  fastify.get("/api/ships", getAllShipsOpts);
  fastify.get("/api/ships/:pilotCertification", getShipOpts);
  fastify.post("/api/ships/new", postShipOpts);
  fastify.put("/api/ships/edit/:pilotCertification", updateShipOpts);
  fastify.delete("/api/ships/:pilotCertification", deleteShipOpts);
  done();
};

module.exports = shipsRoutes;
