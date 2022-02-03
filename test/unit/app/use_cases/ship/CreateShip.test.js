const { CreateShip } = require("../../../../../src/app/use_cases/ship");
const {
  FakeRepositoriesFactory,
} = require("../../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../../support/factories/data");

const dataFactory = new DataFactory();
let pilots = [
  dataFactory.create("Pilot", {
    id: 1,
    pilotCertification: 1234567,
    name: "Matheus",
    age: 22,
    credits: 0,
    locationPlanet: "Aqua",
  }),
  dataFactory.create("Pilot", {
    id: 2,
    pilotCertification: 1234566,
    name: "Kael",
    age: 20,
    credits: 5000,
    locationPlanet: "Aqua",
  }),
  dataFactory.create("Pilot", {
    id: 3,
    pilotCertification: 1234577,
    name: "Tom",
    age: 24,
    credits: 2000,
    locationPlanet: "Calas",
  }),
  dataFactory.create("Pilot", {
    id: 4,
    pilotCertification: 1234588,
    name: "Jerry",
    age: 30,
    credits: 2000,
    locationPlanet: "Demeter",
  }),
];
let ships = [
  dataFactory.create("Ship", {
    id: 1,
    pilotCertification: 1234567,
    fuelCapacity: 1500,
    fuelLevel: 50,
    weightCapacity: 2000,
  }),
  dataFactory.create("Ship", {
    id: 2,
    pilotCertification: 1234566,
    fuelCapacity: 1500,
    fuelLevel: 500,
    weightCapacity: 1000,
  }),
  dataFactory.create("Ship", {
    id: 3,
    pilotCertification: 1234588,
    fuelCapacity: 1500,
    fuelLevel: 1500,
    weightCapacity: 1999,
  }),
];

const factory = new FakeRepositoriesFactory();
let fakePilotRepo = factory.create("Pilots", pilots);
let fakeShipRepo = factory.create("Ships", ships);

describe("App :: UseCases :: CreateShip", () => {
  describe("#execute", () => {
    describe("when doesnt find pilot by a given pilot certification", () => {
      it("returns not found error", async () => {
        const createShip = new CreateShip(fakeShipRepo, fakePilotRepo);
        let data = {
          pilotCertification: 1234666,
          fuelCapacity: 1000,
          fuelLevel: 21,
          weightCapacity: 700,
        };

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification ${data.pilotCertification} can't be found.`;

        await expect(createShip.execute(data)).rejects.toThrow(notFoundError);
      });
    });
    describe("when pilot has a ship", () => {
      it("returns validation error", async () => {
        const createShip = new CreateShip(fakeShipRepo, fakePilotRepo);
        let data = {
          pilotCertification: 1234567,
          fuelCapacity: 1000,
          fuelLevel: 21,
          weightCapacity: 700,
        };

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `There's a ship with pilotCertification ${data.pilotCertification}!`;

        await expect(createShip.execute(data)).rejects.toThrow(validationError);
      });
    });

    describe("when creates a ship", () => {
      it("returns correct value", async () => {
        const createShip = new CreateShip(fakeShipRepo, fakePilotRepo);
        let data = {
          pilotCertification: 1234577,
          fuelCapacity: 2000,
          fuelLevel: 2000,
          weightCapacity: 1000,
        };

        const answer = dataFactory.create("Ship", {
          id: 4,
          ...data,
        });

        expect(await createShip.execute(data)).toEqual(answer);
      });
    });

    describe("When user try to create a ship", () => {
      it("but only returns internal error", async () => {
        const error = new Error("Internal Error");
        error.original = { detail: `Server instance is not available!` };
        fakePilotRepo.getByPilotCertification = (data) => {
          throw error;
        };
        const createShip = new CreateShip(fakeShipRepo, fakePilotRepo);
        let data = {
          pilotCertification: 1234577,
          fuelCapacity: 2000,
          fuelLevel: 2000,
          weightCapacity: 1000,
        };
        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;

        await expect(() => createShip.execute(data)).rejects.toThrow(
          internalError
        );
      });
    });
  });
});
