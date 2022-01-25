const {Cargos, Contracts, Pilots, Ships, Resources, Transactions} = require('../../../../src/infra/database/models');

class ModelsFactory {
  constructor() {}

  createList(type, list) {
    try {
      return Promise.all(list.map((d) => (this.create(type, d))));
    }
    catch(error) {
      console.log(error)
      throw error
    }
  }

  create(type, data) {
      switch (type) {
        case "Cargos":
          return Promise.resolve(Cargos.create(data)).catch((error) => console.log(error));
        case "Contracts":
          return Promise.resolve(Contracts.create(data)).catch((error) => console.log(error));
        case "Pilots":
          return Promise.resolve(Pilots.create(data)).catch((error) => console.log(error));
        case "Ships":
          return Promise.resolve(Ships.create(data)).catch((error) => console.log(error));
        case "Resources":
          return Promise.resolve(Resources.create(data)).catch((error) => console.log(error));
        case "Transactions":
          return Promise.resolve(Transactions.create(data)).catch((error) => console.log(error));
        default: {
          const validationError = new Error("Model not found Error");
          validationError.CODE = "MODELNOTFOUND_ERROR";
          validationError.errors = "Unknown Model type";
          throw validationError;
        }
      }
  }

  returnModel(type) {
    switch (type) {
      case "Cargos":
        return Cargos;
      case "Contracts":
        return Contracts;
      case "Pilots":
        return Pilots;
      case "Ships":
        return Ships;
      case "Resources":
        return Resources;
      case "Transactions":
        return Transactions;
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

