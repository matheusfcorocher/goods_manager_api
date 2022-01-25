const supertest = require("supertest");
const app = require("../../../app");
const { DatabaseHandler } = require("../../support/database");
const { ModelsFactory } = require("../../support/factories/models");
const {
  RepositoriesFactory,
} = require("../../support/factories/repository/RepositoriesFactory");
const { setupIntegrationTest } = require("../../support/setup");

const modelsFactory = new ModelsFactory();

describe("Ships Routes Tests", () => {
  setupIntegrationTest(app);
  describe("POST /api/ships/create", () => {
    describe("when doesnt find pilot by a given pilot certification", () => {
      it("returns not found error", async () => {
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
          pilotCertification: 1234666,
          fuelCapacity: 1000,
          fuelLevel: 21,
          weightCapacity: 700,
        };

        const response = await supertest(app.server)
          .post("/api/ships/create")
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        let messageError =
        `Pilot with pilotCertification ${data.pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("when pilot has a ship", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          }
        ]);
        await modelsFactory.createList("Ships", [
          {

            pilotCertification: 1234567,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);
        const data = {
          pilotCertification: 1234567,
          fuelCapacity: 1000,
          fuelLevel: 21,
          weightCapacity: 700,
        };
        const response = await supertest(app.server)
          .post("/api/ships/create")
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        let messageError =
        `There's a ship with pilotCertification ${data.pilotCertification}!`;
        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("when creates a ship", () => {
      it("returns correct value", async () => {
        const pilots = await modelsFactory.createList("Pilots", [
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
          }
        ]);
        
        await modelsFactory.createList("Ships", [
          {
            pilotCertification: 1234567,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);

        const data = {
          pilotCertification: 1234555,
          fuelLevel: 1000,
          fuelCapacity: 1000,
          weightCapacity: 1000,
        };

        const response = await supertest(app.server)
          .post("/api/ships/create")
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);

        const expected = [
          expect.stringMatching(/^Ship [\d]* added!/),
        ]
        expect([response.text]).toEqual(expect.arrayContaining(expected));
      });
    });
  });
  // describe("PUT /api/ships/refill/:pilotCertification", () => {

  // });
});
