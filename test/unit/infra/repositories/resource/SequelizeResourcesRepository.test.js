const SequelizeResourcesRepository = require("../../../../../src/infra/repositories/resource/SequelizeResourcesRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Resource } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizeResourcesRepository(
  modelsFactory.returnModel("Resources")
);
describe("Infra :: Resource :: SequelizeResourcesRepository", () => {
  setupIntegrationTest();
  beforeEach(async () => {
    await modelsFactory.createList("Resources", [
      { name: "water", weight: 100 },
    ]);
  });

  describe("#getById", () => {
    describe("when resource do exist", () => {
      it("returns resource from the database", async () => {
        const resource = await repository.getById(1);

        expect(resource).toBeInstanceOf(Resource);
        expect(resource).toEqual(
          dataFactory.create("Resource", { name: "water", weight: 100 })
        );
      });
    });

    describe("when resource doesn't exist", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id 10 can't be found.`;
        await expect(() => repository.getById(10)).rejects.toThrow(
          notFoundError
        );
      });
    });
  });
});
