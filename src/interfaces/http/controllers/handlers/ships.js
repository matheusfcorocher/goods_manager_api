const {
  CreateShip,
  DeleteShip,
  GetAllShips,
  GetShip,
  RefillShip,
  UpdateShip
} = require("../../../../app/use_cases/ship/index.js");
const models = require("../../../../infra/database/models/index.js");
const SequelizePilotsRepository = require("../../../../infra/repositories/pilot/SequelizePilotsRepository.js");
const SequelizeShipsRepository = require("../../../../infra/repositories/ship/SequelizeShipsRepository.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");
const ShipSerializer = require("../serializers/ShipSerializer.js");

const {Ships, Pilots, Transactions} = models;

const shipModel = models.Ships;
const pilotModel = models.Pilots;
const transactionModel = models.Transactions;
const shipRepo = new SequelizeShipsRepository(shipModel);
const pilotRepo = new SequelizePilotsRepository(pilotModel);
const transactionRepo = new SequelizeTransactionsRepository(transactionModel);

const getAllShipsHandler = async (req, reply) => {
  const getAllShips = new GetAllShips(shipRepo);
  const { SUCCESS, ERROR } = getAllShips.outputs;
  getAllShips
    .on(SUCCESS, (ships) => {
      reply.send(ships);
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    });

    getAllShips.execute();
}

const getShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;
  const getShip = new GetShip(shipRepo);
  const { SUCCESS, NOT_FOUND} = getShip.outputs;
  getShip
    .on(SUCCESS, (ship) => {
      reply.send(ship);
    })
    .on(NOT_FOUND, (error) => {
      reply.status(404).send({
        errorMsg: error,
      });
    })

  getShip.execute(pilotCertification);
}

const postShipHandler = async (req, reply) => {
  const createShip = new CreateShip(shipRepo, pilotRepo);
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createShip.outputs;
  createShip
    .on(SUCCESS, (ship) => {
      reply.send(`Ship ${ship.id} added!`);
    })
    .on(VALIDATION_ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

  createShip.execute(req.body);
};

const updateShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const updateShip = new UpdateShip(shipRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = updateShip.outputs;

  updateShip
    .on(SUCCESS, (ship) => {
      reply.send(ShipSerializer.serialize(ship));
    })
    .on(VALIDATION_ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(NOT_FOUND, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

    updateShip.execute(pilotCertification, req.body);
};

const refillShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const refillShip = new RefillShip(shipRepo, pilotRepo, transactionRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = refillShip.outputs;

  refillShip
    .on(SUCCESS, (message) => {
      reply.send(message);
    })
    .on(VALIDATION_ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(NOT_FOUND, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

  refillShip.execute(pilotCertification);
};

const deleteShipHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const deleteShip = new DeleteShip(shipRepo);
  const { SUCCESS, NOT_FOUND, ERROR} = deleteShip.outputs;

  deleteShip
    .on(SUCCESS, () => {
      reply.send("Ship deleted!");
    })
    .on(NOT_FOUND, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

  deleteShip.execute(pilotCertification);
};

module.exports = { getAllShipsHandler, getShipHandler, postShipHandler, updateShipHandler, refillShipHandler, deleteShipHandler };