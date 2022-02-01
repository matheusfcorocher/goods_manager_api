const { DataFactory } = require("../../../support/factories/data");
const dataFactory = new DataFactory();

describe("Pilot Tests ", () => {
  describe("isLegal", () => {
    describe("if pilot has age equals or more than 18", () => {
      it("returns true", () => {
        const pilot1 = dataFactory.create("Pilot", {
          id: 1,
          pilotCertification: 1234567,
          name: "Tom",
          age: 18,
          credits: 1000,
          locationPlanet: "Aqua",
        });
        expect(pilot1.isLegal()).toEqual(true);
      });
    });
    describe("if pilot has age below 18", () => {
      it("returns false", () => {
        const pilot2 = dataFactory.create("Pilot", {
          id: 2,
          pilotCertification: 1234566,
          name: "Peter",
          age: 15,
          credits: 500,
          locationPlanet: "Demeter",
        });
        expect(pilot2.isLegal()).toEqual(false);
      });
    });
  });
});
