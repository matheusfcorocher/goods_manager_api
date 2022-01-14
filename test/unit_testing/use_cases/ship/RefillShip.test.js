const { RefillShip } = require("../../../../src/app/use_cases/ship");
const Pilot = require("../../../../src/domain/entities/Pilot");
const Ship = require("../../../../src/domain/entities/Ship");

describe("RefillShip tests", () => {
    describe("_refillShip", () => {
      const refillShip = new RefillShip(null, null, null);
      describe("when pilot has 0 credits to pay the entire fulfillment of ship", () => {
        let pilot0 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 0, locationPlanet: "Aqua"})
        let ship0 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000})
        it("returns 0 credits and the the same fuel level", () => {
          expect(refillShip._refillShip(pilot0, ship0)).toEqual({credits: 0, fuelLevel: 25});
        });
      });
  
      describe("when pilot has less credits to pay the entire fulfillment of ship", () => {
        let pilot1 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 5000, locationPlanet: "Aqua"})
        let ship1 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000})
        it("returns 0 credits and the corresponding credits for fuel level", () => {
          expect(refillShip._refillShip(pilot1, ship1)).toEqual({credits: 0, fuelLevel: 739});
        });
      });
  
      describe("when pilot has more credits to pay the entire fulfillment of ship", () => {
        let pilot2 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 15000, locationPlanet: "Aqua"})
        let ship2 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000})
        it("returns corresponding credits and fuel level corresponding fuelCapacity of ship", () => {
          expect(refillShip._refillShip(pilot2, ship2)).toEqual({credits: 4676, fuelLevel: 1500});
        });
      });
  
      describe("when calculating the refill of ship and his fuelCapacity is already full", () => {
        let pilot3 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 1000, locationPlanet: "Aqua"})
        let ship3 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 1500, weightCapacity: 1000})
        it("returns the same initial credits and fuelLevel", () => {
          expect(refillShip._refillShip(pilot3, ship3)).toEqual({credits: 1000, fuelLevel: 1500});
        });
      });
    });
  });