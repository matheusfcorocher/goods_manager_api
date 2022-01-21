const {Cargos, Contracts, Pilots, Ships, Resources, Transactions} = require('../../../../src/infra/database/models');

class ModelsFactory {
  constructor() {}

  createList(type, list) {
    return Promise.all(list.map((d) => (this.create(type, d))));
  }

  create(type, data) {
    switch (type) {
      case "Cargos":
        return Promise.resolve(Cargos.create(data));
      case "Contracts":
        return Promise.resolve(Contracts.create(data));
      case "Pilots":
        return Promise.resolve(Pilots.create(data));
      case "Ships":
        return Promise.resolve(Ships.create(data));
      case "Resources":
        return Promise.resolve(Resources.create(data));
      case "Transactions":
        return Promise.resolve(Transactions.create(data));
      default: {
        const validationError = new Error("Model not found Error");
        validationError.CODE = "MODELNOTFOUND_ERROR";
        validationError.errors = "Unknown Model type";
        throw validationError;
      }
    }
  }
}

module.exports = { ModelsFactory };

