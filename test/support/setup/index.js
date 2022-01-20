const { DatabaseHandler } = require("../database");

const setupIntegrationTest = () => {
  //Comment this line if you're not using a database
  beforeEach(DatabaseHandler.cleanDatabase);
  afterAll(DatabaseHandler.closeDatabase);
};

module.exports = { setupIntegrationTest };
