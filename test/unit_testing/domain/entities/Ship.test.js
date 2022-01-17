const Ship = require("../../../../src/domain/entities/Ship");

describe("_isPossibleToShipCarry", () => {
  let ship = new Ship({
    id: 1,
    pilotCertification: 1234567,
    fuelCapacity: 1500,
    fuelLevel: 50,
    weightCapacity: 2000,
  });
  describe("If actual ship weight and total contract weight is smaller than ship weight capacity", () => {
    it("returns true", () => {
      expect(ship.canCarry(1500)).toEqual(true);
    });
  });

  describe("If actual ship weight and total contract weight is equal than ship weight capacity", () => {
    it("returns true", () => {
      expect(ship.canCarry(2000)).toEqual(true);
    });
  });

  describe("If actual ship weight and total contract weight is greater than ship weight capacity", () => {
    it("returns false", () => {
      expect(ship.canCarry(2001)).toEqual(false);
    });
  });
});
