const { DataFactory } = require("../../../support/factories/data");
const RefillShipDomainService = require("../../../../src/domain/services/RefillShipDomainService");

const dataFactory = new DataFactory();

describe("Domain :: Service :: RefillShipDomainService", () => {
  describe("when pilot has 0 credits to pay the entire fulfillment of ship", () => {
    it("returns 0 credits and the the same fuel level", () => {
      let pilot0 = dataFactory.create("Pilot", {
        id: 1,
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 0,
        locationPlanet: "Aqua",
      });
      let ship0 = dataFactory.create("Ship", {
        id: 1,
        pilotCertification: 1234567,
        fuelCapacity: 1500,
        fuelLevel: 25,
        weightCapacity: 1000,
      });
      expect(RefillShipDomainService(pilot0, ship0)).toEqual({
        credits: 0,
        fuelLevel: 25,
      });
    });
  });

  describe("when pilot has less credits to pay the entire fulfillment of ship", () => {
    it("returns 0 credits and the corresponding credits for fuel level", () => {
      let pilot1 = dataFactory.create("Pilot", {
        id: 1,
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 5000,
        locationPlanet: "Aqua",
      });
      let ship1 = dataFactory.create("Ship", {
        id: 1,
        pilotCertification: 1234567,
        fuelCapacity: 1500,
        fuelLevel: 25,
        weightCapacity: 1000,
      });
      expect(RefillShipDomainService(pilot1, ship1)).toEqual({
        credits: 0,
        fuelLevel: 739,
      });
    });
  });

  describe("when pilot has more credits to pay the entire fulfillment of ship", () => {
    it("returns corresponding credits and fuel level corresponding fuelCapacity of ship", () => {
      let pilot2 = dataFactory.create("Pilot", {
        id: 1,
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 15000,
        locationPlanet: "Aqua",
      });
      let ship2 = dataFactory.create("Ship", {
        id: 1,
        pilotCertification: 1234567,
        fuelCapacity: 1500,
        fuelLevel: 25,
        weightCapacity: 1000,
      });
      expect(RefillShipDomainService(pilot2, ship2)).toEqual({
        credits: 4676,
        fuelLevel: 1500,
      });
    });
  });

  describe("when calculating the refill of ship and his fuelCapacity is already full", () => {
    it("returns the same initial credits and fuelLevel", () => {
      let pilot3 = dataFactory.create("Pilot", {
        id: 1,
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 1000,
        locationPlanet: "Aqua",
      });
      let ship3 = dataFactory.create("Ship", {
        id: 1,
        pilotCertification: 1234567,
        fuelCapacity: 1500,
        fuelLevel: 1500,
        weightCapacity: 1000,
      });
      expect(RefillShipDomainService(pilot3, ship3)).toEqual({
        credits: 1000,
        fuelLevel: 1500,
      });
    });
  });
});
