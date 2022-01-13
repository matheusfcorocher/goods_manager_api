const {
  CreatePilot,
  GetAllPilots,
  GetPilot,
  UpdatePilot,
  TravelPilot,
  DeletePilot
} = require("../../../../app/use_cases/pilot/index.js");
const models = require("../../../../infra/database/models/index.js");
const SequelizePilotsRepository = require("../../../../infra/repositories/pilot/SequelizePilotsRepository.js");
const SequelizeShipsRepository = require("../../../../infra/repositories/ship/SequelizeShipsRepository.js");
const PilotSerializer = require("../serializers/PilotSerializer.js");

const pilotModel = models.Pilots;
const pilotRepo = new SequelizePilotsRepository(pilotModel);
const shipModel = models.Ships;
const shipRepo = new SequelizeShipsRepository(shipModel);

const getAllPilotsHandler = async (req, reply) => {
  const getAllPilots = new GetAllPilots(pilotRepo);
  const { SUCCESS, ERROR } = getAllPilots.outputs;
  getAllPilots
    .on(SUCCESS, (pilots) => {
      reply.send(pilots);
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    });

  getAllPilots.execute();
};

const getPilotHandler = async (req, reply) => {
  const { pilotCertification } = req.params;
  const getPilot = new GetPilot(pilotRepo);
  const { SUCCESS, NOT_FOUND} = getPilot.outputs;
  getPilot
    .on(SUCCESS, (pilot) => {
      reply.send(pilot);
    })
    .on(NOT_FOUND, (error) => {
      reply.status(404).send({
        errorMsg: error.errors[0].message,
      });
    })

  getPilot.execute(pilotCertification);
};

const postPilotHandler = async (req, reply) => {
  const createPilot = new CreatePilot(pilotRepo);
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createPilot.outputs;
  createPilot
    .on(SUCCESS, (pilot) => {
      reply.send(`Pilot ${pilot.name} added!`);
    })
    .on(VALIDATION_ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    });

  createPilot.execute(req.body);
};

const updatePilotHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const updatePilot = new UpdatePilot(pilotRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = updatePilot.outputs;

  updatePilot
    .on(SUCCESS, (pilot) => {
      reply.send(PilotSerializer.serialize(pilot));
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

  updatePilot.execute(pilotCertification, req.body);
};

const travelPilotHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const travelPilot = new TravelPilot(pilotRepo, shipRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = travelPilot.outputs;

  travelPilot
    .on(SUCCESS, (pilot) => {
      reply.send(PilotSerializer.serialize(pilot));
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

  travelPilot.execute(pilotCertification, req.body);
};

const deletePilotHandler = async (req, reply) => {
  const { pilotCertification } = req.params;

  const deletePilot = new DeletePilot(pilotRepo);
  const { SUCCESS, NOT_FOUND, ERROR} = deletePilot.outputs;

  deletePilot
    .on(SUCCESS, () => {
      reply.send("Pilot deleted!");
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

  deletePilot.execute(pilotCertification);
};

module.exports = {
  getAllPilotsHandler,
  getPilotHandler,
  postPilotHandler,
  updatePilotHandler,
  travelPilotHandler,
  deletePilotHandler,
};
