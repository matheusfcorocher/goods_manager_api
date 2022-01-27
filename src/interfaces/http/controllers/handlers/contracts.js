const models = require("../../../../infra/database/models/index.js");
const SequelizeContractsRepository = require("../../../../infra/repositories/contract/SequelizeContractsRepository.js");
const GetAllContracts = require("../../../../app/use_cases/contract/GetAllContracts.js");
const SequelizeShipsRepository = require("../../../../infra/repositories/ship/SequelizeShipsRepository.js");
const SequelizeResourcesRepository = require("../../../../infra/repositories/resource/SequelizeResourcesRepository.js");
const SequelizeCargosRepository = require("../../../../infra/repositories/cargo/SequelizeCargosRepository.js");
const AcceptContract = require("../../../../app/use_cases/contract/AcceptContract.js");
const SequelizePilotsRepository = require("../../../../infra/repositories/pilot/SequelizePilotsRepository.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");
const FulfillContract = require("../../../../app/use_cases/contract/FulfillContract.js");
const PublishContract = require("../../../../app/use_cases/contract/PublishContract.js");

const ContractSerializer = require("../serializers/ContractSerializer.js");

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

const acceptContractHandler = async (req, reply) => {
  try {
    const { id } = req.params;
    const acceptContract = new AcceptContract({
      cargosRepository: cargoRepo,
      contractsRepository: contractRepo,
      pilotsRepository: pilotRepo,
      shipsRepository: shipRepo,
      resourcesRepository: resourceRepo,
    });
    const result = await acceptContract.execute(id, req.body);
    reply.send(ContractSerializer.serialize(result));
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        return reply.status(500).send({ message: error.message });
    }
  }
};

const fulfillContractHandler = async (req, reply) => {
  try {
    const { id } = req.params;

    const fulfillContract = new FulfillContract({
      contractsRepository: contractRepo,
      pilotsRepository: pilotRepo,
      transactionsRepository: transactionRepo,
    });
    const result = await fulfillContract.execute(id);
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

const getAllContractsHandler = async (req, reply) => {
  try {
    const { contractStatus } = req.query;
    const getAllContracts = new GetAllContracts(contractRepo);
    const result = await getAllContracts.execute(contractStatus);
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      default:
        return reply.status(500).send({
          message: "Internal Error",
        });
    }
  }
};

const publishContractHandler = async (req, reply) => {
  try {
    const publishContract = new PublishContract(contractRepo, cargoRepo);
    await publishContract.execute(req.body);
    reply.send("Contract was added successfully!");
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

module.exports = {
  acceptContractHandler,
  getAllContractsHandler,
  publishContractHandler,
  fulfillContractHandler,
};
