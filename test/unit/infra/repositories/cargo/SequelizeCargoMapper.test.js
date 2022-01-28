const SequelizeCargoMapper = require("../../../../../src/infra/repositories/cargo/SequelizeCargoMapper");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();
describe("Infra :: Cargo :: SequelizeCargoMapper", () => {
  describe(".toEntity", () => {
    it("returns cargo instance with passed subcargos", () => {
      let cargos = [
        {
          id: 1,
          cargoId: 1,
          resourceId: 1,
        },
        {
          id: 1,
          cargoId: 1,
          resourceId: 2,
        },
        {
          id: 1,
          cargoId: 1,
          resourceId: 3,
        },
      ];

      expect(SequelizeCargoMapper.toEntity(cargos)).toEqual(
        dataFactory.create("Cargo", { cargoId: 1, resourceId: [1, 2, 3] })
      );
    });
  });
});
