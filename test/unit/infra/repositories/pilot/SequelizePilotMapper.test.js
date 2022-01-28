const SequelizePilotMapper = require("../../../../../src/infra/repositories/pilot/SequelizePilotMapper");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();
describe("Infra :: Pilot :: SequelizePilotMapper", () => {
  describe(".toEntity", () => {
    it("returns pilot instance with passed object", () => {
      let pilot = {
        id: 1,
        pilotCertification: 1234567,
        name: "John",
        age: 22,
        credits: 2000,
        locationPlanet: "Aqua",
      };

      expect(SequelizePilotMapper.toEntity(pilot)).toEqual(
        dataFactory.create("Pilot", pilot)
      );
    });
  });

  describe(".toDatabase", () => {
    it("returns prepared object to be persisted", () => {
      let pilot = {
        pilotCertification: 1234567,
        name: "John",
        age: 22,
        credits: 2000,
        locationPlanet: "Aqua",
      };

      let entityCargo = dataFactory.create("Pilot", pilot);

      expect(SequelizePilotMapper.toDatabase(entityCargo)).toEqual(pilot);
    });
  });
});
