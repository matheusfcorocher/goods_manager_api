const { createShip, refillShip } = require("../../../../container");

const createShipHandler = async (req, reply) => {
  try {
    const { createShip } = req.container.ships;
    const result = await createShip.execute(req.body);
    reply.send(`Ship ${result.id} added!`);
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const refillShipHandler = async (req, reply) => {
  try {
    const { refillShip } = req.container.ships;
    const { pilotCertification } = req.params;
    const result = await refillShip.execute(pilotCertification);
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

module.exports = { createShipHandler, refillShipHandler };
