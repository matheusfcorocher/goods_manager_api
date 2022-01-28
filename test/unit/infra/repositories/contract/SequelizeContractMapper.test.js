const SequelizeContractMapper = require("../../../../../src/infra/repositories/contract/SequelizeContractMapper");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();
describe("Infra :: Contract :: SequelizeContractMapper", () => {
  describe(".toEntity", () => {
    it("returns contract instance with passed object", () => {
      let contract = {
        id: 1,
        pilotCertification: 1234567,
        cargoId: 1,
        description: "water, food and minerals to Demeter.",
        originPlanet: "Andvari",
        destinationPlanet: "Calas",
        value: 5000,
        contractStatus: "IN PROGRESS",
      };

      expect(SequelizeContractMapper.toEntity(contract)).toEqual(
        dataFactory.create("Contract", contract)
      );
    });
  });

  describe(".toDatabase", () => {
    it("returns prepared object to be persisted", () => {
      let contract = {
        cargoId: 1,
        description: "water, food and minerals to Demeter.",
        originPlanet: "Andvari",
        destinationPlanet: "Calas",
        value: 5000,
        contractStatus: "CREATED",
      };

      let entityCargo = dataFactory.create("Contract", contract);

      expect(SequelizeContractMapper.toDatabase(entityCargo)).toEqual(contract);
    });
  });
});
