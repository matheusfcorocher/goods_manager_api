const Pilot = require("../../../../src/domain/entities/Pilot");

describe("Pilot Tests ", () => {
    describe("isLegal", () => {
      let pilot1 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Tom", age: 18, credits: 1000, locationPlanet: "Aqua"});
      let pilot2 = new Pilot({ id: 2, pilotCertification: 1234566, name: "Peter", age: 15, credits: 500, locationPlanet: "Demeter"});
      describe("if pilot has age equals or more than 18", () => {
        it("returns true", () => {
          expect(pilot1.isLegal()).toEqual(true);
        });
      });
      describe("if pilot has age below 18", () => {
        it("returns false", () => {
          expect(pilot2.isLegal()).toEqual(false);
        });
      });
    });
  });