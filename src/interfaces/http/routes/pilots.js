const {
  createPilotSchema,
  travelPilotSchema,
} = require("../controllers/schemas/pilots.js");
const {
  createPilotHandler,
  travelPilotHandler,
} = require("../controllers/handlers/pilots.js");

const createPilotOpts = {
  schema: createPilotSchema,
  handler: createPilotHandler,
};

const travelPilotOpts = {
  schema: travelPilotSchema,
  handler: travelPilotHandler,
};

const pilotsRoutes = (fastify, options, done) => {
  fastify.post("/api/pilots/create", createPilotOpts);
  fastify.put('/api/pilots/travel/:pilotCertification', travelPilotOpts);
  done();
};

module.exports = pilotsRoutes;
