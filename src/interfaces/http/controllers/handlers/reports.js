const models = require("../../../../infra/database/models/index.js");
const {
  GetTransactionsReport,
  GetPlanetsReport,
  GetPilotsReport,
} = require("../../../../app/use_cases/reports/index.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");
const SequelizeResourcesRepository = require("../../../../infra/repositories/resource/SequelizeResourcesRepository.js");
const SequelizeContractsRepository = require("../../../../infra/repositories/contract/SequelizeContractsRepository.js");
const SequelizeCargosRepository = require("../../../../infra/repositories/cargo/SequelizeCargosRepository.js");

const cargoModel = models.Cargos;
const contractModel = models.Contracts;
const pilotModel = models.Pilots;
const resourceModel = models.Resources;
const transactionModel = models.Transactions;

const cargoRepo = new SequelizeCargosRepository(cargoModel);
const contractRepo = new SequelizeContractsRepository(contractModel);
const pilotRepo = new SequelizeContractsRepository(pilotModel);
const resourceRepo = new SequelizeResourcesRepository(resourceModel);
const transactionRepo = new SequelizeTransactionsRepository(transactionModel);

const getPlanetsReportHandler = async (req, reply) => {
  try {
    const getPlanetsReport = new GetPlanetsReport(
      cargoRepo,
      contractRepo,
      resourceRepo
    );
    const result = await getPlanetsReport.execute();
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const getPilotsReportHandler = async (req, reply) => {
  try {
    const getPilotsReport = new GetPilotsReport(
      cargoRepo,
      contractRepo,
      pilotRepo,
      resourceRepo
    );
    const result = await getPilotsReport.execute();
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const getTransactionsReportHandler = async (req, reply) => {
  try {
    const getTransactionsReport = new GetTransactionsReport(transactionRepo);
    const result = await getTransactionsReport.execute();
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

module.exports = {
  getPlanetsReportHandler,
  getPilotsReportHandler,
  getTransactionsReportHandler,
};
