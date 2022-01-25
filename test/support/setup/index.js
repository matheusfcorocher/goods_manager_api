const { DatabaseHandler } = require("../database");

const setupIntegrationTest = (app) => {
  //Comment this line if you're not using a database
  // beforeAll(() => app.ready())
  beforeEach(async () => {
    app.ready()
    await DatabaseHandler.cleanDatabase()
  });
  afterEach(async () => {
    await app.close();
    await DatabaseHandler.closeDatabase();
    // DatabaseHandler.cleanDatabase()
  });
  // afterAll( async () => {
  //   await app.close();
  //   await DatabaseHandler.closeDatabase();
  // });
};

module.exports = { setupIntegrationTest };