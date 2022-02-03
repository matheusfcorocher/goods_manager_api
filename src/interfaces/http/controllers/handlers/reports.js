const getPlanetsReportHandler = async (req, reply) => {
  try {
    const { getPlanetsReport } = req.container.reports;
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
    const { getPilotsReport } = req.container.reports;
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
    const { getTransactionsReport } = req.container.reports;
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
