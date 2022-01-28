const SequelizeTransactionMapper = require("../../../../../src/infra/repositories/transaction/SequelizeTransactionMapper");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();
describe("Infra :: Transaction :: SequelizeTransactionMapper", () => {
  describe(".toEntity", () => {
    it("returns transaction instance with passed object", () => {
      let transaction = {
        id: 1,
        about: "Tom catches Jerry again"
      };

      expect(SequelizeTransactionMapper.toEntity(transaction)).toEqual(
        dataFactory.create("Transaction", transaction)
      );
    });
  });

  describe(".toDatabase", () => {
    it("returns prepared object to be persisted", () => {
      let transaction = {
        about: "Tom catches Jerry again"
      };

      let entityCargo = dataFactory.create("Transaction", transaction);

      expect(SequelizeTransactionMapper.toDatabase(entityCargo)).toEqual(transaction);
    });
  });
});
