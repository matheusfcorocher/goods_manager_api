const SequelizeResourceMapper = require("../../../../../src/infra/repositories/resource/SequelizeResourceMapper");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();
describe("Infra :: Resource :: SequelizeResourceMapper", () => {
  describe(".toEntity", () => {
    it("returns resource instance with passed object", () => {
      let resource = {
        id: 1, name: "water", weight: 1000
      };

      expect(SequelizeResourceMapper.toEntity(resource)).toEqual(
        dataFactory.create("Resource", resource)
      );
    });
  });
});
