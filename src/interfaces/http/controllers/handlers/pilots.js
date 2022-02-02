const {
  CreatePilot,
  TravelPilot,
} = require("../../../../app/use_cases/pilot/index.js");
const models = require("../../../../infra/database/models/index.js");
const SequelizePilotsRepository = require("../../../../infra/repositories/pilot/SequelizePilotsRepository.js");
const SequelizeShipsRepository = require("../../../../infra/repositories/ship/SequelizeShipsRepository.js");
const PilotSerializer = require("../serializers/PilotSerializer.js");

const pilotModel = models.Pilots;
const pilotRepo = new SequelizePilotsRepository(pilotModel);
const shipModel = models.Ships;
const shipRepo = new SequelizeShipsRepository(shipModel);

const createPilotHandler = async (req, reply) => {
  try {
    const createPilot = new CreatePilot(pilotRepo);
    const pilot = await createPilot.execute(req.body);;
    reply.send(`Pilot ${pilot.name} added!`);
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({message: error.errors});
      case "NOTFOUND_ERROR":
        return reply.status(404).send({message: error.message});
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const travelPilotHandler = async (req, reply) => {
  try {
    const { pilotCertification } = req.params;
    const travelPilot = new TravelPilot(pilotRepo, shipRepo);    
    const pilot = await travelPilot.execute(pilotCertification, req.body);
    reply.send(PilotSerializer.serialize(pilot));
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({message: error.errors});
      case "NOTFOUND_ERROR":
        return reply.status(404).send({message: error.message});
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

module.exports = {
  createPilotHandler,
  travelPilotHandler,
};
