const { createPilot, travelPilot } = require("../../../../container.js");
const PilotSerializer = require("../serializers/PilotSerializer.js");

const createPilotHandler = async (req, reply) => {
  try {
    const { createPilot } = req.container.pilots;
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
    const { travelPilot } = req.container.pilots;
    const { pilotCertification } = req.params;
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
