const SequelizePilotsRepository = require("../../../../../src/infra/repositories/pilot/SequelizePilotsRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Pilot } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizePilotsRepository(
  modelsFactory.returnModel("Pilots")
);
describe("Infra :: Pilot :: SequelizePilotsRepository", () => {
  setupIntegrationTest();
  beforeEach(async () => {
    await modelsFactory.createList("Pilots", [
      {
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 1000,
        locationPlanet: "Andvari",
      },
      {
        pilotCertification: 1234555,
        name: "Sam",
        age: 20,
        credits: 2000,
        locationPlanet: "Andvari",
      },
    ]);
  });

  describe("#getByPilotCertification", () => {
    describe("when pilot do exist", () => {
      it("returns a pilot from the database", async () => {
        const pilot = await repository.getByPilotCertification(1234567);

        expect(pilot).toBeInstanceOf(Pilot);
        expect(pilot).toEqual(
          dataFactory.create("Pilot", {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Andvari",
          })
        );
      });
    });

    describe("when pilot doesn't exist", () => {
      it("returns not found error", async () => {
        const certification = 1234124;
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification ${certification} can't be found.`;
        await expect(() =>
          repository.getByPilotCertification(certification)
        ).rejects.toThrow(notFoundError);
      });
    });
  });

  describe("#getAll", () => {
    describe("when pilots do exist", () => {
      it("returns pilots from the database", async () => {
        const pilot = await repository.getAll();

        expect(pilot).toHaveLength(2);
        expect(pilot[0]).toBeInstanceOf(Pilot);
        expect(pilot[0]).toEqual(
          dataFactory.create("Pilot", {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Andvari",
          })
        );
        expect(pilot[1]).toBeInstanceOf(Pilot);
        expect(pilot[1]).toEqual(
          dataFactory.create("Pilot", {
            pilotCertification: 1234555,
            name: "Sam",
            age: 20,
            credits: 2000,
            locationPlanet: "Andvari",
          })
        );
      });
    });
  });

  describe("#add", () => {
    describe("when adding a pilot to the database", () => {
      it("returns the new pilot", async () => {
        const pilot = dataFactory.create("Pilot", {
          pilotCertification: 1234556,
          name: "Eham",
          age: 22,
          credits: 1000,
          locationPlanet: "Andvari",
        });

        const newPilot = await repository.add(pilot);

        expect(newPilot).toBeInstanceOf(Pilot);
        expect(newPilot).toEqual(pilot);
      });
    });

    describe("when the new pilot doesn't have pilotCertification, name, age, credits, locationPlanet", () => {
      it("returns validation error", async () => {
        const pilot = dataFactory.create("Pilot", {});

        let errors = [
          {
            message: '"pilotCertification" is required',
            path: ["pilotCertification"],
          },
          { message: '"name" is required', path: ["name"] },
          { message: '"credits" is required', path: ["credits"] },
          {
            message: '"locationPlanet" is required',
            path: ["locationPlanet"],
          },
        ];
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = errors;
        await expect(() => repository.add(pilot)).rejects.toThrow(
          validationError
        );
      });
    });
  });

  describe("#update", () => {
    describe("when update a pilot", () => {
      it("returns pilot updated", async () => {
        const data = {
          name: "Xavier",
          age: 60,
          credits: 15000,
          locationPlanet: "Calas",
        };

        const updatedPilot = await repository.update(1234567, data);

        const pilot = dataFactory.create("Pilot", {
          pilotCertification: 1234567,
          ...data,
        });
        expect(updatedPilot).toBeInstanceOf(Pilot);
        expect(updatedPilot).toEqual(pilot);
      });
    });

    describe("when doesn't find pilotCertification of pilot", () => {
      it("returns not found error", async () => {
        const data = {};

        const certification = 1234124;
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification ${certification} can't be found.`;
        await expect(() =>
          repository.update(certification, data)
        ).rejects.toThrow(notFoundError);
      });
    });
  });
});
