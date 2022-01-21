const CreatePilot = require("../../../../src/app/use_cases/pilot/CreatePilot");
const {
  FakeRepositoriesFactory,
} = require("../../../support/factories/repository");
const { DataFactory } = require("../../../support/factories/data");

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

const factory = new FakeRepositoriesFactory();
let fakePilotRepo = factory.create("Pilots", pilots);

describe("CreatePilot Tests", () => {
  describe("execute", () => {
    describe("When pilot doesnt have minimum age for be a pilot", () => {
      it("returns validation error", async () => {
        const createPilot = new CreatePilot(fakePilotRepo);

        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";

        const data = {
          pilotCertification: 1234111,
          name: "Marshmellow",
          age: 17,
          credits: 100,
          locationPlanet: "Demeter",
        };
        await expect(() => createPilot.execute(data)).rejects.toThrow(
          validationError
        );
      });
    });

    describe("When pilot location planet is unknown", () => {
      it("returns validation error", async () => {
        const createPilot = new CreatePilot(fakePilotRepo);

        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";

        const data = {
          pilotCertification: 1234111,
          name: "Marsh",
          age: 18,
          credits: 100,
          locationPlanet: "Xmas",
        };
        await expect(() => createPilot.execute(data)).rejects.toThrow(
          validationError
        );
      });
    });

    describe("When register a pilot", () => {
      it("returns the new pilot", async () => {
        const createPilot = new CreatePilot(fakePilotRepo);

        const data = {
          pilotCertification: 1234111,
          name: "Ven",
          age: 19,
          credits: 1100,
          locationPlanet: "Andvari",
        };
        expect(await createPilot.execute(data)).toEqual(
          dataFactory.create("Pilot", {
            id: pilots.length + 1,
            pilotCertification: 1234111,
            name: "Ven",
            age: 19,
            credits: 1100,
            locationPlanet: "Andvari",
          })
        );
      });
    });
  });
});
