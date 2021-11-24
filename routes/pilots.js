const {
  getAllPilotsSchema,
  getPilotSchema,
  postPilotSchema,
  updatePilotSchema,
  deletePilotSchema,
} = require("../controllers/schemas/pilots.js");
const {
  getAllPilotsHandler,
  getPilotHandler,
  postPilotHandler,
  updatePilotHandler,
  deletePilotHandler,
} = require("../controllers/handlers/pilots.js");

const getAllPilotsOpts = {
  schema: getAllPilotsSchema,
  handler: getAllPilotsHandler,
};

const getPilotOpts = {
  schema: getPilotSchema,
  handler: getPilotHandler,
};

const postPilotOpts = {
  schema: postPilotSchema,
  handler: postPilotHandler,
};

const updatePilotOpts = {
  schema: updatePilotSchema,
  handler: updatePilotHandler,
};

const deletePilotOpts = {
  schema: deletePilotSchema,
  handler: deletePilotHandler,
};

const pilotsRoutes = (fastify, options, done) => {
  fastify.get("/api/pilots", getAllPilotsOpts);
  fastify.get("/api/pilots/:pilot_certification", getPilotOpts);
  fastify.post("/api/pilots/new", postPilotOpts);
  fastify.put('/api/pilots/edit/:pilot_certification', updatePilotOpts);
  fastify.delete('/api/pilots/:pilot_certification', deletePilotOpts);

  done();
};

module.exports = pilotsRoutes;
