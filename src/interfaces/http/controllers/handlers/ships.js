const {
  CreateShip,
  RefillShip,
} = require("../../../../app/use_cases/ship/index.js");
const models = require("../../../../infra/database/models/index.js");
const SequelizePilotsRepository = require("../../../../infra/repositories/pilot/SequelizePilotsRepository.js");
const SequelizeShipsRepository = require("../../../../infra/repositories/ship/SequelizeShipsRepository.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");

const { Ships, Pilots, Transactions } = models;

const shipModel = models.Ships;
const pilotModel = models.Pilots;
const transactionModel = models.Transactions;
const shipRepo = new SequelizeShipsRepository(shipModel);
const pilotRepo = new SequelizePilotsRepository(pilotModel);
const transactionRepo = new SequelizeTransactionsRepository(transactionModel);

const createShipHandler = async (req, reply) => {
  try {
    const createShip = new CreateShip(shipRepo, pilotRepo);
    const result = await createShip.execute(req.body);
    reply.send(`Ship ${result.id} added!`);
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        return reply.status(500).send({
          message: "Internal Error",
        });
    }
  }
};

const refillShipHandler = async (req, reply) => {
  try {
    const { pilotCertification } = req.params;
    const refillShip = new RefillShip(shipRepo, pilotRepo, transactionRepo);
    const result = await refillShip.execute(pilotCertification);
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        return reply.status(500).send({
          message: "Internal Error",
        });
    }
  }
};

module.exports = { createShipHandler, refillShipHandler };
