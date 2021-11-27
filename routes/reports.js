const {
  getPlanetsReportSchema,
  getPilotsReportSchema,
  getTransactionsReportSchema,
} = require("../controllers/schemas/reports.js");
const {
  getPlanetsReportHandler,
  getPilotsReportHandler,
  getTransactionsReportHandler,
} = require("../controllers/handlers/reports.js");

const getPlanetsReportOpts = {
  schema: getPlanetsReportSchema,
  handler: getPlanetsReportHandler,
};

const getPilotsReportOpts = {
  schema: getPilotsReportSchema,
  handler: getPilotsReportHandler,
};

const getTransactionsReportOpts = {
  schema: getTransactionsReportSchema,
  handler: getTransactionsReportHandler,
};

const transactionsRoutes = (fastify, options, done) => {
  fastify.get("/api/reports/planets", getPlanetsReportOpts);
  fastify.get("/api/reports/pilots", getPilotsReportOpts);
  fastify.get("/api/reports/transactions", getTransactionsReportOpts);
  done();
};

module.exports = transactionsRoutes;
