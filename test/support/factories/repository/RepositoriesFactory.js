const SequelizeCargosRepository = require("../../../../src/infra/repositories/cargo/SequelizeCargosRepository");
const SequelizeContractsRepository = require("../../../../src/infra/repositories/contract/SequelizeContractsRepository");
const SequelizePilotsRepository = require("../../../../src/infra/repositories/pilot/SequelizePilotsRepository");
const SequelizeResourcesRepository = require("../../../../src/infra/repositories/resource/SequelizeResourcesRepository");
const SequelizeShipsRepository = require("../../../../src/infra/repositories/ship/SequelizeShipsRepository");
const SequelizeTransactionsRepository = require("../../../../src/infra/repositories/transaction/SequelizeTransactionsRepository");
const { ModelsFactory } = require("../models");

class RepositoriesFactory {
  constructor() {
    this.modelsFactory = new ModelsFactory();
  }

  create(type) {
    switch (type) {
      case "Cargos":
        return new SequelizeCargosRepository(
          this.modelsFactory.returnModel("Cargos")
        );
      case "Contracts":
        return new SequelizeContractsRepository(
          this.modelsFactory.returnModel("Contracts")
        );
      case "Pilots":
        return new SequelizePilotsRepository(
          this.modelsFactory.returnModel("Pilots")
        );
      case "Resources":
        return new SequelizeResourcesRepository(
          this.modelsFactory.returnModel("Resources")
        );
      case "Ships":
        return new SequelizeShipsRepository(
          this.modelsFactory.returnModel("Ships")
        );
      case "Transactions":
        return new SequelizeTransactionsRepository(
          this.modelsFactory.returnModel("Transactions")
        );
      default: {
        console.log("Unknown Repository type");
      }
    }
  }
}

module.exports = { RepositoriesFactory };
