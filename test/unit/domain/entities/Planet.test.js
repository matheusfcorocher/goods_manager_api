const { isValidPlanet } = require("../../../../src/domain/entities/Planet");

describe("Planet Tests", () => {
    describe("isValidPlanet", () => {
      describe("If the planet name is valid", () => {
        it("returns true", () => {
          expect(isValidPlanet("Andvari")).toEqual(true);
        });
      });
      describe("If the planet name is invalid", () => {
        it("returns false", () => {
          expect(isValidPlanet("Olympia")).toEqual(false);
        });
      });
    });
  });