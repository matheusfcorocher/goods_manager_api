const fakeCargoRepository = require("../repositories/fakeCargoRepository");
const fakeContractRepository = require("../repositories/fakeContractRepository");
const fakePilotRepository = require("../repositories/fakePilotRepository");
const fakeResourceRepository = require("../repositories/fakeResourceRepository");
const fakeShipRepository = require("../repositories/fakeShipRepository");
const fakeTransactionRepository = require("../repositories/fakeTransactionRepository");

class FakeRepositoriesFactory {
  constructor() {}

  create(type, data) {
    switch (type) {
      case "Cargos":
        return new fakeCargoRepository(data);
      case "Contracts":
        return new fakeContractRepository(data);
      case "Pilots":
        return new fakePilotRepository(data);
      case "Ships":
        return new fakeShipRepository(data);
      case "Resources":
        return new fakeResourceRepository(data);
      case "Transactions":
        return new fakeTransactionRepository(data);
      default: {
        console.log("Unknown Repository type");
      }
    }
  }
}

module.exports = { FakeRepositoriesFactory };
