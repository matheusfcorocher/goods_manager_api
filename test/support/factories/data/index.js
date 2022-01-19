const {Pilot, Contract, Cargo, Ship, Resource, Transaction} = require("../../../../src/domain/entities")
class DataFactory {
  constructor() {}

  createList(type, list) {
    return list.map((d) => this.create(type, d));
  }

  create(type, data) {
    switch (type) {
      case "Cargo":
        return new Cargo(data);
      case "Contract":
        return new Contract(data);
      case "Pilot":
        return new Pilot(data);
      case "Ship":
        return new Ship(data);
      case "Resource":
        return new Resource(data);
      case "Transaction":
        return new Transaction(data);
      default: {
        const validationError = new Error("Type not found Error");
        validationError.CODE = "TYPENOTFOUND_ERROR";
        validationError.errors = "Unknown Entity type";
        throw validationError;
      }
    }
  }
}

module.exports = { DataFactory };

