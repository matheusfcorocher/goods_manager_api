const models = require("../../../../infra/database/models/index.js");
const { Op } = require("sequelize");
const { compareValues } = require("../../../../../helpers/index");
const TransactionSerializer = require("../serializers/TransactionSerializer.js");
const { GetTransactionsReport, GetPlanetsReport, GetPilotsReport } = require("../../../../app/use_cases/reports/index.js");
const SequelizeTransactionsRepository = require("../../../../infra/repositories/transaction/SequelizeTransactionsRepository.js");
const SequelizeResourcesRepository = require("../../../../infra/repositories/resource/SequelizeResourcesRepository.js");
const SequelizeContractsRepository = require("../../../../infra/repositories/contract/SequelizeContractsRepository.js");
const SequelizeCargosRepository = require("../../../../infra/repositories/cargo/SequelizeCargosRepository.js");
const { Contracts, Pilots, Cargos, Resources, Transactions } = models;

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
  const getPlanetsReport = new GetPlanetsReport(cargoRepo, contractRepo, resourceRepo);
  const { SUCCESS, ERROR } = getPlanetsReport.outputs;
  getPlanetsReport
    .on(SUCCESS, (planetsReport) => {
      reply.send(planetsReport);
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

    getPlanetsReport.execute();
};

const getPilotsReportHandler = async (req, reply) => {
  const getPilotsReport = new GetPilotsReport(cargoRepo, contractRepo, pilotRepo, resourceRepo);
  const { SUCCESS, ERROR } = getPilotsReport.outputs;
  getPilotsReport
    .on(SUCCESS, (pilotsReport) => {
      reply.send(pilotsReport);
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error,
      });
    });

    getPilotsReport.execute();
};

const getTransactionsReportHandler = async (req, reply) => {
  const getTransactionsReport = new GetTransactionsReport(transactionRepo);
  const { SUCCESS, ERROR } = getTransactionsReport.outputs;
  getTransactionsReport
    .on(SUCCESS, (transactions) => {
      reply.send(transactions);
    })
    .on(ERROR, (error) => {
      reply.status(500).send({
        errorMsg: error.errors[0].message,
      });
    });

  getTransactionsReport.execute();
};

module.exports = {
  getPlanetsReportHandler,
  getPilotsReportHandler,
  getTransactionsReportHandler,
};
