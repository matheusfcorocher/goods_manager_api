const SequelizeShipsRepository = require("../../../../../src/infra/repositories/ship/SequelizeShipsRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Ship } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizeShipsRepository(
  modelsFactory.returnModel("Ships")
);
describe("Infra :: Ship :: SequelizeShipsRepository", () => {
  setupIntegrationTest();
  beforeEach(async () => {
    await modelsFactory.createList("Pilots", [
      {
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 1000,
        locationPlanet: "Aqua",
      },
      {
        pilotCertification: 1234555,
        name: "Carlos",
        age: 20,
        credits: 500,
        locationPlanet: "Demeter",
      },
    ]);

    await modelsFactory.createList("Ships", [
      {
        pilotCertification: 1234567,
        fuelLevel: 1000,
        fuelCapacity: 1000,
        weightCapacity: 1000,
      },
    ]);
  });

  describe("#add", () => {
    describe("when adding a ship to the database", () => {
      it("returns the new ship", async () => {
        const ship = dataFactory.create("Ship", {
          pilotCertification: 1234555,
          fuelLevel: 1000,
          fuelCapacity: 1000,
          weightCapacity: 1000,
        });

        const newShip = await repository.add(ship);

        expect(newShip).toBeInstanceOf(Ship);
        expect(newShip).toEqual(ship);
      });
    });

    describe("when the new ship doesn't have pilotCertification, fuelLevel, fuelCapacity, weightCapacity", () => {
      it("returns validation error", async () => {
        const ship = dataFactory.create("Ship", {});
        let errors = [
          {
            message: '"pilotCertification" is required',
            path: ["pilotCertification"],
          },
          { message: '"fuelLevel" is required', path: ["fuelLevel"] },
          { message: '"fuelCapacity" is required', path: ["fuelCapacity"] },
          {
            message: '"weightCapacity" is required',
            path: ["weightCapacity"],
          },
        ];
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = errors;
        await expect(() => repository.add(ship)).rejects.toThrow(
          validationError
        );
      });
    });
  });

  describe("#getByPilotCertification", () => {
    describe("when ship do exist", () => {
      it("returns a ship from the database", async () => {
        const ship = await repository.getByPilotCertification(1234567);

        expect(ship).toBeInstanceOf(Ship);
        expect(ship).toEqual(
          dataFactory.create("Ship", {
            pilotCertification: 1234567,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          })
        );
      });
    });

    describe("when ship doesn't exist", () => {
      it("returns not found error", async () => {
        const certification = 1234555;
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Ship with pilotCertification ${certification} can't be found.`;
        await expect(() =>
          repository.getByPilotCertification(certification)
        ).rejects.toThrow(notFoundError);
      });
    });
  });

  describe("#hasShip", () => {
    describe("when ship do exist", () => {
      it("returns true", async () => {
        const answer = await repository.hasShip(1234567);
        expect(answer).toEqual(true);
      });
    });

    describe("when ship doesn't exist", () => {
      it("returns false", async () => {
        const answer = await repository.hasShip(1234511);
        expect(answer).toEqual(false);
      });
    });
  });

  describe("#update", () => {
    describe("when ship do exist", () => {
      it("returns ship updated", async () => {
        const data = {
          fuelLevel: 1500,
          fuelCapacity: 1500,
          weightCapacity: 1500,
        };

        const ship = dataFactory.create("Ship", {
          pilotCertification: 1234567,
          ...data,
        });

        const updatedShip = await repository.update(1234567, data);

        expect(updatedShip).toBeInstanceOf(Ship);
        expect(updatedShip).toEqual(ship);
      });
    });

    describe("when ship doesn't exist", () => {
      it("returns not found error", async () => {
        const data = {};
        const certification = 1234555;
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Ship with pilotCertification ${certification} can't be found.`;

        await expect(() => repository.update(1234555, data)).rejects.toThrow(
          notFoundError
        );
      });
    });
  });
});
