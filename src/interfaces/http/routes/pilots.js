const {
  getAllPilotsSchema,
  getPilotSchema,
  postPilotSchema,
  updatePilotSchema,
  deletePilotSchema,
  travelPilotSchema,
} = require("../controllers/schemas/pilots.js");
const {
  getAllPilotsHandler,
  getPilotHandler,
  postPilotHandler,
  updatePilotHandler,
  deletePilotHandler,
  travelPilotHandler,
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

const travelPilotOpts = {
  schema: travelPilotSchema,
  handler: travelPilotHandler,
};

const deletePilotOpts = {
  schema: deletePilotSchema,
  handler: deletePilotHandler,
};

const pilotsRoutes = (fastify, options, done) => {
  fastify.get("/api/pilots", getAllPilotsOpts);
  fastify.get("/api/pilots/:pilotCertification", getPilotOpts);
  fastify.post("/api/pilots/new", postPilotOpts);
  fastify.put('/api/pilots/edit/:pilotCertification', updatePilotOpts);
  fastify.put('/api/pilots/travel/:pilotCertification', travelPilotOpts);
  fastify.delete('/api/pilots/:pilotCertification', deletePilotOpts);

  done();
};

module.exports = pilotsRoutes;
