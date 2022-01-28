const SequelizeShipMapper = require("../../../../../src/infra/repositories/ship/SequelizeShipMapper");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();
describe("Infra :: Ship :: SequelizeShipMapper", () => {
  describe(".toEntity", () => {
    it("returns ship instance with passed object", () => {
      let ship = {
        id: 1,
        pilotCertification: 1234567,
        fuelCapacity: 1000,
        fuelLevel: 1000,
        weightCapacity: 2000,
      };

      expect(SequelizeShipMapper.toEntity(ship)).toEqual(
        dataFactory.create("Ship", ship)
      );
    });
  });

  describe(".toDatabase", () => {
    it("returns prepared object to be persisted", () => {
      let ship = {
        pilotCertification: 1234567,
        fuelCapacity: 1000,
        fuelLevel: 1000,
        weightCapacity: 2000,
      };

      let entityCargo = dataFactory.create("Ship", ship);

      expect(SequelizeShipMapper.toDatabase(entityCargo)).toEqual(ship);
    });
  });
});
