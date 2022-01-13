const { travelFuelCost } = require("../../../../../core_rules/travel/rules.js");
const { WeightContract } = require("../../../../../core_rules/resources/rules.js");
const { WeightContractIsCarrying, isPossibleToShipCarry} = require("../../../../../core_rules/ship/rules.js");
const { Sequelize } = require("../../../../infra/database/models/index.js");
const models = require("../../../../infra/database/models/index.js");
const { findNestedContracts, findNestedContract } = require("../../../../infra/database/models/actions/index.js");
const { Contracts, Ships, Transactions } = models;
const SequelizeContractsRepository = require("../../../../infra/repositories/contract/SequelizeContractsRepository.js");
const GetAllContracts = require("../../../../app/use_cases/contract/GetAllContracts.js");
const SequelizeShipsRepository = require("../../../../infra/repositories/ship/SequelizeShipsRepository.js");
const SequelizeResourcesRepository = require("../../../../infra/repositories/resource/SequelizeResourcesRepository.js");
const SequelizeCargosRepository = require("../../../../infra/repositories/cargo/SequelizeCargosRepository.js");
const AcceptContract = require("../../../../app/use_cases/contract/AcceptContract.js");
const SequelizePilotsRepository = require("../../../../infra/repositories/pilot/SequelizePilotsRepository.js");
const ContractSerializer = require("../serializers/ContractSerializer.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");
const FulfillContract = require("../../../../app/use_cases/contract/FulfillContract.js");

const cargoModel = models.Cargos;
const contractModel = models.Contracts;
const pilotModel = models.Pilots;
const shipModel = models.Ships;
const resourceModel = models.Resources;
const transactionModel = models.Transactions;

const cargoRepo = new SequelizeCargosRepository(cargoModel);
const contractRepo = new SequelizeContractsRepository(contractModel);
const pilotRepo = new SequelizePilotsRepository(pilotModel);
const shipRepo = new SequelizeShipsRepository(shipModel);
const resourceRepo = new SequelizeResourcesRepository(resourceModel);
const transactionRepo = new SequelizeTransactionsRepository(transactionModel);

const getAllContractsHandler = async (req, reply) => {
  const { contractStatus } = req.query
  const getAllContracts = new GetAllContracts(contractRepo);
  const { SUCCESS, ERROR } = getAllContracts.outputs;
  getAllContracts
  .on(SUCCESS, (contracts) => {
    reply.send(contracts);
  })
  .on(ERROR, (error) => {
    reply.status(500).send({
      errorMsg: error.errors[0].message,
    });
  });
  
  getAllContracts.execute(contractStatus);
};

const getContractHandler = async (req, reply) => {
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found",
    });
  }

  reply.send(contract[0]);
};

const postContractHandler = async (req, reply) => {
  const {
    contractCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  } = req.body;

  if (contractStatus) contractStatus = "CREATED";

  await Contracts.create({
    contractCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  });

  reply.send("Contract added!");
};

const postContractsHandler = async (req, reply) => {
  const {
    contractCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  } = req.body;

  if (contractStatus) contractStatus = "CREATED";

  await Contracts.create({
    contractCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  });

  reply.send("Contract added!");
};

const updateContractHandler = async (req, reply) => {
  const {
    contractCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  } = req.body;
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found!",
    });
  }

  await Contracts.update(
    {
      contractCertification,
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus,
    },
    {
      where: {
        id,
      },
    }
  );

  reply.send("Contract updated!");
};
const acceptContractHandler = async (req, reply) => {
  const { id } = req.params;

  const acceptContract = new AcceptContract(cargoRepo, contractRepo, pilotRepo, shipRepo, resourceRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = acceptContract.outputs;

  acceptContract
    .on(SUCCESS, (contract) => {
      reply.send(ContractSerializer.serialize(contract));
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

    acceptContract.execute(id, req.body);
};

const fulfillContractHandler = async (req, reply) => {
  const { id } = req.params;

  const fulfillContract = new FulfillContract(contractRepo, pilotRepo, transactionRepo);
  const { ERROR, NOT_FOUND, SUCCESS, VALIDATION_ERROR } = fulfillContract.outputs;

  fulfillContract
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

    fulfillContract.execute(id);
};

const deleteContractHandler = async (req, reply) => {
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send(new Error("Contract not found"));
  }

  await Contracts.destroy({
    where: {
      id,
    },
  });

  return reply.send("Contract deleted!");
};

module.exports = {
  acceptContractHandler,
  getAllContractsHandler,
  getContractHandler,
  postContractHandler,
  postContractsHandler,
  updateContractHandler,
  deleteContractHandler,
  fulfillContractHandler,
};
