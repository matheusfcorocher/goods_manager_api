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
  setupIntegrationTest();
  describe("POST /api/pilots/create", () => {
    describe("When pilot doesnt have minimum age for be a pilot", () => {
      it("returns validation error", async () => {
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

        const messageError =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When pilot location planet is unknown", () => {
      it("returns validation error", async () => {
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

        const messageError =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When register a pilot", () => {
      it("returns the new pilot", async () => {
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

    describe("when send a data to route", () => {
      describe("without pilotCertification property", () => {
        it("returns bad request response", async () => {
          const data = {
            // pilotCertification: 1234111,
            name: "Ven",
            age: 19,
            credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without name property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            // name: "Ven",
            age: 19,
            credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without age property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: "Ven",
            // age: 19,
            credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without credits property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: "Ven",
            age: 19,
            // credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without locationPlanet property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: "Ven",
            age: 19,
            credits: 1100,
            // locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in pilotCertification property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: "1234111",
            name: "Ven",
            age: 19,
            credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in name property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: 13,
            age: 19,
            credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in age property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: "Ven",
            age: "19",
            credits: 1100,
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in credits property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: "Ven",
            age: 19,
            credits: "1100",
            locationPlanet: "Andvari",
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in locationPlanet property", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234111,
            name: "Ven",
            age: 19,
            credits: 1100,
            locationPlanet: 321,
          };

          const response = await supertest(app.server)
            .post("/api/pilots/create")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
    });
  });
  describe("PUT /api/pilots/travel/:pilotCertification", () => {
    describe("When it gives invalid planet to travel", () => {
      it("returns validation error", async () => {
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
        const data = {
          destinationPlanet: "Alberta",
        };
        const pilotCertification = 1234555;

        const response = await supertest(app.server)
          .put(`/api/pilots/travel/${pilotCertification}`)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError = "Destination planet is unknown.";
        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When it doesnt find ship with a given pilot certification", () => {
      it("returns validation error", async () => {
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
        const data = {
          destinationPlanet: "Andvari",
        };
        const pilotCertification = 1234555;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        const messageError = `Ship with pilotCertification ${pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns the new pilot", async () => {
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
        const data = {
          destinationPlanet: "Andvari",
        };
        const pilotCertification = 1234557;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        const messageError = `Pilot with pilotCertification ${pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When ship doesnt have enough fuel to travel", () => {
      it("returns validation error", async () => {
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
          {
            pilotCertification: 1234555,
            fuelLevel: 10,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        const pilotCertification = 1234555;
        const response = await supertest(app.server)
          .put("/api/pilots/travel/" + pilotCertification)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError = `Ship doesn't have enough fuel to travel to destination planet.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When pilot travel to another planet", () => {
      it("returns pilot with new location", async () => {
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
          {
            pilotCertification: 1234555,
            fuelLevel: 10,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          },
        ]);
        const data = {
          destinationPlanet: "Andvari",
        };
        const pilotCertification = 1234567;
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
        const oldShip = {
          id: "2",
          pilotCertification: 1234567,
          fuelLevel: 1000,
          fuelCapacity: 1000,
          weightCapacity: 1000,
        };
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
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

    describe("when request travel pilot route", () => {
      describe("without pilotCertification params", () => {
        it("returns bad request response", async () => {
          const data = {
            destinationPlanet: "Andvari",
          };
          const pilotCertification = "";

          const response = await supertest(app.server)
            .put("/api/pilots/travel/" + pilotCertification)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with pilotCertification params has wrong data type", () => {
        it("returns bad request response", async () => {
          const data = {
            destinationPlanet: "Andvari",
          };
          const pilotCertification = "auhh";

          const response = await supertest(app.server)
            .put("/api/pilots/travel/" + pilotCertification)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without destinationPlanet in body request", () => {
        it("returns bad request response", async () => {
          const data = {};
          const pilotCertification = 1234567;

          const response = await supertest(app.server)
            .put("/api/pilots/travel/" + pilotCertification)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);
          expect(response.status).toEqual(400);
        });
      });
      describe("with destinationPlanet in body request has wrong data type", () => {
        it("returns bad request response", async () => {
          const data = {destinationPlanet: 1234,};
          const pilotCertification = 1234567;

          const response = await supertest(app.server)
            .put("/api/pilots/travel/" + pilotCertification)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
    });
  });
});
