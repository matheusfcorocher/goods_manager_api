const { DatabaseHandler } = require("../database");

const setupIntegrationTest = (app) => {
  //Comment this line if you're not using a database
  beforeAll(() =>  app.ready())
  beforeEach(DatabaseHandler.cleanDatabase);
  afterAll( async () => {
    app.close();
    await DatabaseHandler.closeDatabase();
  });
};

module.exports = { setupIntegrationTest };
