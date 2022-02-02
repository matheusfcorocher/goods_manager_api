const supertest = require("supertest");
const app = require("../../../app");
const { ModelsFactory } = require("../../support/factories/models");
const { setupIntegrationTest } = require("../../support/setup");

const modelsFactory = new ModelsFactory();

describe("Reports Routes", () => {
  setupIntegrationTest();
  describe("API :: GET /api/reports/transactions", () => {
    describe("When has transactions in db", () => {
      it("returns a valid report", async () => {
        await modelsFactory.createList("Transactions", [
          { about: "Mamma" },
          { about: "Mia" },
        ]);
        const response = await supertest(app.server)
          .get("/api/reports/transactions")
          .expect(200);

        expect(response.body).toEqual(["Mamma", "Mia"]);
      });
    });
    describe("When doesnt have any transactions in db", () => {
      it("returns empty report", async () => {
        const response = await supertest(app.server)
          .get("/api/reports/transactions")
          .expect(200);

        expect(response.body).toEqual([]);
      });
    });
  });

  describe("API :: GET /api/reports/pilots", () => {
    describe("when it gets pilots report", () => {
      it("returns the correct report", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
          { name: "food", weight: 2000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
          { cargoId: 2, resourceId: 2 },
          { cargoId: 3, resourceId: 3 },
          { cargoId: 4, resourceId: 4 },
        ]);

        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 0,
            locationPlanet: "Aqua",
          },
          {
            pilotCertification: 1234566,
            name: "Peter",
            age: 20,
            credits: 5000,
            locationPlanet: "Aqua",
          },
          {
            pilotCertification: 1234577,
            name: "Tom",
            age: 24,
            credits: 2000,
            locationPlanet: "Calas",
          },
          {
            pilotCertification: 1234588,
            name: "Jerry",
            age: 30,
            credits: 2000,
            locationPlanet: "Demeter",
          },
        ]);

        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: null,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
          {
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 1500,
            contractStatus: "IN PROGRESS",
          },
          {
            pilotCertification: 1234577,
            cargoId: 3,
            description: "minerals to Demeter.",
            originPlanet: "Calas",
            destinationPlanet: "Demeter",
            value: 1000,
            contractStatus: "IN PROGRESS",
          },
          {
            pilotCertification: null,
            cargoId: 4,
            description: "food to Calas.",
            originPlanet: "Demeter",
            destinationPlanet: "Calas",
            value: 4000,
            contractStatus: "CREATED",
          },
        ]);

        const response = await supertest(app.server)
          .get("/api/reports/pilots")
          .expect(200);

        const answer = [
          {
            id: 1,
            pilotCertification: 1234567,
            transporting: {
              water: 0,
              food: 100,
              minerals: 0,
            },
          },
          {
            id: 2,
            pilotCertification: 1234566,
            transporting: {
              water: 0,
              food: 0,
              minerals: 0,
            },
          },
          {
            id: 3,
            pilotCertification: 1234577,
            transporting: {
              water: 0,
              food: 0,
              minerals: 100,
            },
          },
          {
            id: 4,
            pilotCertification: 1234588,
            transporting: {
              water: 0,
              food: 0,
              minerals: 0,
            },
          },
        ];

        expect(response.body).toEqual(answer);
      });
    });
    describe("when doesn't have any pilots", () => {
      it("returns empty array", async () => {
        const response = await supertest(app.server)
          .get("/api/reports/pilots")
          .expect(200);
        const answer = [];
        expect(response.body).toEqual(answer);
      });
    });
  });

  describe("API :: GET /api/reports/planets", () => {
    describe("when it gets planets report", () => {
      it("returns the correct report", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
          { name: "food", weight: 2000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
          { cargoId: 2, resourceId: 2 },
          { cargoId: 3, resourceId: 3 },
          { cargoId: 4, resourceId: 4 },
        ]);

        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 0,
            locationPlanet: "Aqua",
          },
          {
            pilotCertification: 1234566,
            name: "Peter",
            age: 20,
            credits: 5000,
            locationPlanet: "Aqua",
          },
          {
            pilotCertification: 1234577,
            name: "Tom",
            age: 24,
            credits: 2000,
            locationPlanet: "Calas",
          },
          {
            pilotCertification: 1234588,
            name: "Jerry",
            age: 30,
            credits: 2000,
            locationPlanet: "Demeter",
          },
        ]);

        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: null,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
          {
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 1500,
            contractStatus: "IN PROGRESS",
          },
          {
            pilotCertification: 1234577,
            cargoId: 3,
            description: "minerals to Demeter.",
            originPlanet: "Calas",
            destinationPlanet: "Demeter",
            value: 1000,
            contractStatus: "IN PROGRESS",
          },
          {
            pilotCertification: null,
            cargoId: 4,
            description: "food to Calas.",
            originPlanet: "Demeter",
            destinationPlanet: "Calas",
            value: 4000,
            contractStatus: "CREATED",
          },
        ]);

        const response = await supertest(app.server)
          .get("/api/reports/planets")
          .expect(200);

        const answer = {
          Andvari: {
            sent: {
              food: 0,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
          Aqua: {
            sent: {
              food: 300,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
          Calas: {
            sent: {
              food: 0,
              water: 0,
              minerals: 1000,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
          Demeter: {
            sent: {
              food: 0,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
        };

        expect(response.body).toEqual(answer);
      });
    });

    describe("when doesn't have any contracts to generate a planet report", () => {
      it("returns all resources with 0", async () => {
        const response = await supertest(app.server)
          .get("/api/reports/planets")
          .expect(200);
        const answer = {
          Andvari: {
            sent: {
              food: 0,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
          Aqua: {
            sent: {
              food: 0,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
          Calas: {
            sent: {
              food: 0,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
          Demeter: {
            sent: {
              food: 0,
              water: 0,
              minerals: 0,
            },
            received: {
              food: 0,
              water: 0,
              minerals: 0,
            },
          },
        };
        expect(response.body).toEqual(answer);
      });
    });
  });
});
