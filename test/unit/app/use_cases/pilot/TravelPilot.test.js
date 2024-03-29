const TravelPilot = require("../../../../../src/app/use_cases/pilot/TravelPilot");
const TravelFuelCostDomainService = require("../../../../../src/domain/services/TravelFuelCostDomainService");
const { FakeRepositoriesFactory } = require("../../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../../support/factories/data");

const dataFactory = new DataFactory();
let pilots = [
  dataFactory.create("Pilot", {
    id: 1,
    pilotCertification: 1234567,
    name: "Matheus",
    age: 22,
    credits: 0,
    locationPlanet: "Demeter",
  }),
  dataFactory.create("Pilot", {
    id: 2,
    pilotCertification: 1234566,
    name: "Peter",
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
    fuelLevel: 10,
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
    fuelLevel: 500,
    weightCapacity: 1999,
  }),
];

const factory = new FakeRepositoriesFactory();
let fakePilotRepo = factory.create("Pilots", pilots);
let fakeShipRepo = factory.create("Ships", ships);

describe("App :: UseCases :: TravelPilot", () => {
  describe("#execute", () => {
    describe("When it gives invalid planet to travel", () => {
      it("returns validation error", async () => {
        const travelPilot = new TravelPilot(fakePilotRepo, fakeShipRepo);

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Destination planet is unknown.`;

        await expect(() =>
          travelPilot.execute(pilots[0].pilotCertification, {
            destinationPlanet: "Xmas",
          })
        ).rejects.toThrow(validationError);
      });
    });

    describe("When it doesnt find ship with a given pilot certification", () => {
      it("returns not found error", async () => {
        const travelPilot = new TravelPilot(fakePilotRepo, fakeShipRepo);

        let fakeShip = dataFactory.create("Ship", {
          id: 2,
          pilotCertification: 1234577,
          fuelCapacity: 1500,
          fuelLevel: 500,
          weightCapacity: 1000,
        });
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Ship with pilotCertification ${fakeShip.pilotCertification} can't be found.`;
        await expect(() =>
          travelPilot.execute(fakeShip.pilotCertification, {
            destinationPlanet: "Aqua",
          })
        ).rejects.toThrow(notFoundError);
      });
    });

    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns not found error", async () => {
        const travelPilot = new TravelPilot(fakePilotRepo, fakeShipRepo);

        let fakePilot = dataFactory.create("Pilot", {
          id: 6,
          pilotCertification: 1234999,
          name: "Matheus",
          age: 22,
          credits: 0,
          locationPlanet: "Aqua",
        });

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification ${fakePilot.pilotCertification} can't be found.`;
        await expect(() =>
          travelPilot.execute(fakePilot.pilotCertification, {
            destinationPlanet: "Aqua",
          })
        ).rejects.toThrow(notFoundError);
      });
    });

    describe("When ship doesnt have enough fuel to travel", () => {
      it("returns validation error", async () => {
        const travelPilot = new TravelPilot(fakePilotRepo, fakeShipRepo);

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Ship doesn't have enough fuel to travel to destination planet.`;
        await expect(() =>
          travelPilot.execute(pilots[0].pilotCertification, {
            destinationPlanet: "Aqua",
          })
        ).rejects.toThrow(validationError);
      });
    });

    describe("When pilot travel to another planet", () => {
      it("returns pilot with new location", async () => {
        const travelPilot = new TravelPilot(fakePilotRepo, fakeShipRepo);

        expect(
          await travelPilot.execute(pilots[1].pilotCertification, {
            destinationPlanet: "Andvari",
          })
        ).toEqual(await fakePilotRepo.getById(2));
      });

      it("update fuelLevel of Ship", async () => {
        let oldShip = dataFactory.create("Ship", {
          id: 2,
          pilotCertification: 1234566,
          fuelCapacity: 1500,
          fuelLevel: 500,
          weightCapacity: 1000,
        })
        expect((await fakeShipRepo.getById(2)).fuelLevel
        ).toEqual(oldShip.fuelLevel - TravelFuelCostDomainService("Aqua", "Andvari"));
      });
    });

    describe("When pilot try to travel to another planet", () => {
      it("but only returns internal error", async () => {
        const error = new Error("Internal Error");
        error.original = {detail : `Server instance is not available!`}
        fakePilotRepo.getByPilotCertification = (certification) => {
          throw error
        };
        const travelPilot = new TravelPilot(fakePilotRepo, fakeShipRepo);

        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;

        await expect(() =>
        travelPilot.execute(pilots[1].pilotCertification, {
          destinationPlanet: "Andvari",
        })
        ).rejects.toThrow(internalError);
      });
    });
  });
});
