const SequelizeCargosRepository = require("../../../../../src/infra/repositories/cargo/SequelizeCargosRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Cargo } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizeCargosRepository(modelsFactory.returnModel("Cargos"));
describe("Infra :: Cargo :: SequelizeCargosRepository", () => {
  setupIntegrationTest();
  beforeEach(() => {
    modelsFactory.createList("Resources", [
      { name: "water", weight: 100 },
      { name: "food", weight: 300 },
      { name: "minerals", weight: 1000 },
    ]);

    modelsFactory.createList("Cargos", [
      { cargoId: 1, resourceId: 1 },
      { cargoId: 1, resourceId: 2 },
      { cargoId: 1, resourceId: 3 },
    ]);
  });

  describe("#getById", () => {
    it("returns all cargos from the database", async () => {
      const cargo = await repository.getById(1);

      expect(cargo).toBeInstanceOf(Cargo);
      expect(cargo).toEqual(
        dataFactory.create("Cargo", { cargoId: 1, resourceIds: [1, 2, 3] })
      );
    });
  });
});
