const { RefillShip } = require("../../../../src/app/use_cases/ship");
const Pilot = require("../../../../src/domain/entities/Pilot");
const Ship = require("../../../../src/domain/entities/Ship");
const { FakeRepositoriesFactory } = require("../../../support/factories");

let pilots = [
  new Pilot({
    id: 1,
    pilotCertification: 1234567,
    name: "Matheus",
    age: 22,
    credits: 0,
    locationPlanet: "Aqua",
  }),
  new Pilot({
    id: 2,
    pilotCertification: 1234566,
    name: "Kael",
    age: 20,
    credits: 5000,
    locationPlanet: "Aqua",
  }),
  new Pilot({
    id: 3,
    pilotCertification: 1234577,
    name: "Tom",
    age: 24,
    credits: 2000,
    locationPlanet: "Calas",
  }),
  new Pilot({
    id: 4,
    pilotCertification: 1234588,
    name: "Jerry",
    age: 30,
    credits: 2000,
    locationPlanet: "Demeter",
  }),
];
let ships = [
  new Ship({
    id: 1,
    pilotCertification: 1234567,
    fuelCapacity: 1500,
    fuelLevel: 50,
    weightCapacity: 2000,
  }),
  new Ship({
    id: 2,
    pilotCertification: 1234566,
    fuelCapacity: 1500,
    fuelLevel: 500,
    weightCapacity: 1000,
  }),
  new Ship({
    id: 3,
    pilotCertification: 1234588,
    fuelCapacity: 1500,
    fuelLevel: 1500,
    weightCapacity: 1999,
  }),
];
let transactions = [];

const factory = new FakeRepositoriesFactory();
let fakePilotRepo = factory.create("Pilots", pilots);
let fakeShipRepo = factory.create("Ships", ships);
let fakeTransactionRepo = factory.create("Transactions", transactions);

describe("RefillShip tests", () => {
    describe("execute", () => {
      describe("when doesnt find pilot by a given pilot certification", () => {
        it("returns not found error", async () => {
          const refillShip = new RefillShip(fakeShipRepo, fakePilotRepo, fakeTransactionRepo)
          let pilotCertification = 1234555;
          
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Pilot with pilotCertification ${pilotCertification} can't be found.`;
          
          await expect(refillShip.execute(pilotCertification)).rejects.toThrow(notFoundError)
        })
      })

      describe("when doesnt find ship by given pilot certification", () => {
        it("returns not found error", async () => {
          const refillShip = new RefillShip(fakeShipRepo, fakePilotRepo, fakeTransactionRepo)
          let pilotCertification = 1234577;
          
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Ship with pilotCertification ${pilotCertification} can't be found.`;
          
          await expect(refillShip.execute(pilotCertification)).rejects.toThrow(notFoundError)
        })
      })

      describe("when try to refill a ship with fuelLevel at maximum", () => {
        it("returns validation error", async () => {
          const refillShip = new RefillShip(fakeShipRepo, fakePilotRepo, fakeTransactionRepo)
          let pilotCertification = 1234588;
          
          const validationError = new Error("Validation Error");
          validationError.CODE = "VALIDATION_ERROR";
          validationError.errors = "The fuel capacity of the ship is full!";
          
          await expect(refillShip.execute(pilotCertification)).rejects.toThrow(validationError)
        })
      })

      describe("when ship refills", () => {
        const refillShip = new RefillShip(fakeShipRepo, fakePilotRepo, fakeTransactionRepo)
        it("returns the correct message", async () => {
          let pilotCertification = 1234566;
          
          await expect(refillShip.execute(pilotCertification)).resolves.toEqual(
            "The fuel of the ship was refilled!"
          )
        })
        it("was created transaction", async () => {
          expect((await fakeTransactionRepo.getById(1)).about).toEqual(`Kael bought fuel: +₭5000`);
        });
        it("was updated credits of pilot", async () => {
          expect((await fakePilotRepo.getById(2)).credits).toEqual(0);
        });
        it('was updated fuelLevel of ship', async () => {
          expect((await fakeShipRepo.getById(2)).fuelLevel).toEqual(1214);
        });
      })
    });
  });