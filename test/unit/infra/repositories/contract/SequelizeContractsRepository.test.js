const SequelizeContractsRepository = require("../../../../../src/infra/repositories/contract/SequelizeContractsRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Contract } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizeContractsRepository(
  modelsFactory.returnModel("Contracts")
);
describe("Infra :: Contract :: SequelizeContractsRepository", () => {
  setupIntegrationTest();
  beforeEach(async () => {
    await modelsFactory.createList("Resources", [
      { name: "water", weight: 100 },
      { name: "food", weight: 300 },
      { name: "minerals", weight: 1000 },
    ]);
    await modelsFactory.createList("Cargos", [
      { cargoId: 1, resourceId: 1 },
      { cargoId: 2, resourceId: 2 },
      { cargoId: 3, resourceId: 3 },
    ]);
    await modelsFactory.createList("Pilots", [
      {
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 1000,
        locationPlanet: "Andvari",
      },
    ]);
    await modelsFactory.createList("Contracts", [
      {
        pilotCertification: null,
        cargoId: 1,
        description: "water to Demeter.",
        originPlanet: "Aqua",
        destinationPlanet: "Demeter",
        value: 4000,
        contractStatus: "CREATED",
      },
      {
        pilotCertification: 1234567,
        cargoId: 2,
        description: "food to Calas.",
        originPlanet: "Aqua",
        destinationPlanet: "Calas",
        value: 5000,
        contractStatus: "IN PROGRESS",
      },
      {
        pilotCertification: 1234567,
        cargoId: 3,
        description: "minerals to Andvari.",
        originPlanet: "Demeter",
        destinationPlanet: "Andvari",
        value: 7000,
        contractStatus: "FINISHED",
      },
    ]);
  });

  describe("#getById", () => {
    describe("when contract do exist", () => {
        it("returns a contract from the database", async () => {
          const contract = await repository.getById(1);
    
          expect(contract).toBeInstanceOf(Contract);
          expect(contract).toEqual(
            dataFactory.create("Contract", {
              pilotCertification: null,
              cargoId: 1,
              description: "water to Demeter.",
              originPlanet: "Aqua",
              destinationPlanet: "Demeter",
              value: 4000,
              contractStatus: "CREATED",
            })
          );
        });
    })
    
    describe("when contract doesn't exist", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id 10 can't be found.`;
        await expect(() => repository.getById(10)).rejects.toThrow(notFoundError);
      });
    });
  });
});
