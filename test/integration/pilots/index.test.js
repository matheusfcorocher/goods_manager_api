const supertest = require("supertest");
const app = require("../../../app");
const TravelFuelCostDomainService = require("../../../src/domain/services/TravelFuelCostDomainService");
const { ModelsFactory } = require("../../support/factories/models");
const {
  RepositoriesFactory,
} = require("../../support/factories/repository/RepositoriesFactory");
const { setupIntegrationTest } = require("../../support/setup");

const modelsFactory = new ModelsFactory();

describe("Pilots Routes Tests", () => {
  setupIntegrationTest(app);
  describe("POST /api/pilots/create", () => {
    describe("When pilot doesnt have minimum age for be a pilot", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);
        const response = await supertest(app.server)
          .post("/api/pilots/create")
          .send({
            pilotCertification: 1234544,
            name: "Matheus",
            age: 15,
            credits: 50,
            locationPlanet: "Aqua",
          })
          .set("Content-type", "application/json")
          .expect(400);

        let messageError =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When pilot location planet is unknown", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);
        const response = await supertest(app.server)
          .post("/api/pilots/create")
          .send({
            pilotCertification: 1234544,
            name: "Matheus",
            age: 15,
            credits: 50,
            locationPlanet: "Xmas",
          })
          .set("Content-type", "application/json")
          .expect(400);

        let messageError =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When register a pilot", () => {
      it("returns the new pilot", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);

        const data = {
          pilotCertification: 1234111,
          name: "Ven",
          age: 19,
          credits: 1100,
          locationPlanet: "Andvari",
        };

        const response = await supertest(app.server)
          .post("/api/pilots/create")
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);
        expect(response.text).toEqual(`Pilot ${data.name} added!`);
      });
    });
  });
  describe("PUT /api/pilots/travel/:pilotCertification", () => {
    describe("When it gives invalid planet to travel", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);
        const data = {
          destinationPlanet: "Alberta",
        };
        let pilotCertification = 1234555;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        let messageError = "Destination planet is unknown.";

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When it doesnt find ship with a given pilot certification", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        let pilotCertification = 1234555;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        let messageError = `Ship with pilotCertification ${pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns the new pilot", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        let pilotCertification = 1234557;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        let messageError = `Pilot with pilotCertification ${pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When ship doesnt have enough fuel to travel", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);

        await modelsFactory.createList("Ships", [
          {
            id: "1",
            pilotCertification: 1234567,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
          {
            id: "2",
            pilotCertification: 1234555,
            fuelLevel: 10,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        let pilotCertification = 1234555;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        let messageError = `Ship doesn't have enough fuel to travel to destination planet.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When pilot travel to another planet", () => {
      it("returns pilot with new location", async () => {
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);

        await modelsFactory.createList("Ships", [
          {
            id: "1",
            pilotCertification: 1234567,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
          {
            id: "2",
            pilotCertification: 1234555,
            fuelLevel: 10,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        let pilotCertification = 1234567;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);

        expect(response.body).toEqual({
          pilotCertification: 1234567,
          name: "Matheus",
          age: 22,
          credits: 1000,
          locationPlanet: "Andvari",
        });
      });

      it("update fuelLevel of Ship", async () => {
        const repoFactory = new RepositoriesFactory();
        const repoShip = repoFactory.create("Ships");
        let oldShip = {
          id: "2",
          pilotCertification: 1234567,
          fuelLevel: 1000,
          fuelCapacity: 1000,
          weightCapacity: 1000,
        };
        await modelsFactory.createList("Pilots", [
          {
            id: "1",
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
          {
            id: "2",
            pilotCertification: 1234555,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);

        await modelsFactory.createList("Ships", [
          {
            id: "1",
            pilotCertification: 1234567,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
          {
            id: "2",
            pilotCertification: 1234555,
            fuelLevel: 10,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        await supertest(app.server)
          .put("/api/pilots/travel/" + oldShip.pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);

        expect(
          (await repoShip.getByPilotCertification(1234567)).fuelLevel
        ).toEqual(
          oldShip.fuelLevel - TravelFuelCostDomainService("Aqua", "Andvari")
        );
      });
    });
  });
});
