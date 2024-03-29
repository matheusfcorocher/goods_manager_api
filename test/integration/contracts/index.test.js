const supertest = require("supertest");
const app = require("../../../app");
const ContractSerializer = require("../../../src/interfaces/http/controllers/serializers/ContractSerializer");
const { ModelsFactory } = require("../../support/factories/models");
const {
  RepositoriesFactory,
} = require("../../support/factories/repository/RepositoriesFactory");
const { setupIntegrationTest } = require("../../support/setup");

const modelsFactory = new ModelsFactory();

describe("Contract Routes", () => {
  setupIntegrationTest();
  describe("API :: PUT /api/contracts/accept/:id", () => {
    describe("When it doesnt find the contract with a given id", () => {
      it("returns not found error", async () => {
        const data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 100)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        const messageError = `Contract with id 100 can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns not found error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [{ resourceIds: [1, 2, 3] }]);
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
        ]);
        const data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        const messageError = `Pilot with pilotCertification ${data.pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When location planet of pilot isn't the same as the origin planet of contract", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Andvari",
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
        ]);

        const data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError = `Contract 1 isn't available or pilot isn't in the origin planet of contract.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When contract doesn't have status equals CREATED", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "FINISHED",
          },
        ]);
        const data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError = `Contract 1 isn't available or pilot isn't in the origin planet of contract.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When it doesnt find ship with a given pilot certification", () => {
      it("returns not found error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Aqua",
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
        ]);
        const data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        const messageError = `Ship with pilotCertification 1234567 can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When ship can't carry the required weight of contract", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
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
        ]);
        const data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError = `The ship can't carry the required weight of contract`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When a pilot accept a new contract", () => {
      it("returns the correct result", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
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
            weightCapacity: 1500,
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
        ]);
        const data = {
          pilotCertification: 1234567,
        };

        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);

        expect(response.body).toEqual({
          id: 1,
          pilotCertification: 1234567,
          cargoId: 1,
          description: "water, food and minerals to Demeter.",
          originPlanet: "Aqua",
          destinationPlanet: "Demeter",
          contractStatus: "IN PROGRESS",
          value: 4000,
        });
      });
    });

    describe("When request aceept contract route", () => {
      describe("without id params", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234567,
          };
          const id = "";

          const response = await supertest(app.server)
            .put("/api/contracts/accept/" + id)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with id params has wrong data type", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: 1234567,
          };
          const id = "ItIsNotId";

          const response = await supertest(app.server)
            .put("/api/contracts/accept/" + id)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without pilotCertification in body request", () => {
        it("returns bad request response", async () => {
          const data = {};
          const id = 12;

          const response = await supertest(app.server)
            .put("/api/contracts/accept/" + id)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with pilotCertification in body request has wrong data type", () => {
        it("returns bad request response", async () => {
          const data = {
            pilotCertification: "super",
          };
          const id = 12;

          const response = await supertest(app.server)
            .put("/api/contracts/accept/" + id)
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
    });
  });

  describe("API :: PUT /api/contracts/fulfill/:id", () => {
    describe("When it doesnt find the contract with a given id", () => {
      it("returns not found error", async () => {
        const response = await supertest(app.server)
          .put("/api/contracts/fulfill/" + 100)
          .expect(404);

        const messageError = `Contract with id 100 can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });
    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns not found error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
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
        ]);

        const response = await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(404);

        const messageError = `Pilot with pilotCertification 0 can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When location planet of pilot isn't the same as the destination planet of contract", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Andvari",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "IN PROGRESS",
          },
        ]);

        const response = await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(400);

        const messageError = `Contract 1 is not in progress or the location of pilot isn't the same as the destination planet of contract.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When contract doesn't have status equals IN PROGRESS", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "FINISHED",
          },
        ]);

        const response = await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(400);

        const messageError = `Contract 1 is not in progress or the location of pilot isn't the same as the destination planet of contract.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When a pilot fulfill a contract", () => {
      it("returns the correct result", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "IN PROGRESS",
          },
        ]);

        const response = await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(200);

        const message = "Contract was fullfilled!";

        expect(response.text).toEqual(message);
      });
      it("create transaction", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "IN PROGRESS",
          },
        ]);

        await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const TransactionRepo = repoFactory.create("Transactions");

        expect((await TransactionRepo.getById(1)).about).toEqual(
          "Contract 1 Description paid: -₭4000"
        );
      });
      it("update credits of pilot", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "IN PROGRESS",
          },
        ]);

        await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const pilotRepo = repoFactory.create("Pilots");
        expect(
          (await pilotRepo.getByPilotCertification(1234567)).credits
        ).toEqual(5000);
      });
      it('contractStatus equals "FINISHED"', async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 1, resourceId: 2 },
          { cargoId: 1, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: 1234567,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "IN PROGRESS",
          },
        ]);

        await supertest(app.server)
          .put("/api/contracts/fulfill/" + 1)
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const contractRepo = repoFactory.create("Contracts");

        expect((await contractRepo.getById(1)).contractStatus).toEqual(
          "FINISHED"
        );
      });
    });

    describe("When request fulfill contract route", () => {
      describe("without id params", () => {
        it("returns bad request response", async () => {
          const response = await supertest(app.server)
            .put("/api/contracts/fulfill/")
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with id params has wrong data type", () => {
        it("returns bad request response", async () => {
          const id = "ItIsNotId";

          const response = await supertest(app.server)
            .put("/api/contracts/fulfill/" + id)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
    });
  });

  describe("API :: GET /api/contracts", () => {
    describe("When gets contracts with asc order", () => {
      it("returns the correct array", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 2, resourceId: 2 },
          { cargoId: 3, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Andvari",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: null,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
          {
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Calas.",
            originPlanet: "Aqua",
            destinationPlanet: "Calas",
            value: 5000,
            contractStatus: "IN PROGRESS",
          },
          {
            pilotCertification: 1234567,
            cargoId: 3,
            description: "minerals to Andvari.",
            originPlanet: "Demeter",
            destinationPlanet: "Andvari",
            value: 7000,
            contractStatus: "FINISHED",
          },
        ]);

        const response = await supertest(app.server)
          .get("/api/contracts")
          .expect(200);

        const answer = [
          {
            id: 1,
            pilotCertification: 0,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
          {
            id: 2,
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Calas.",
            originPlanet: "Aqua",
            destinationPlanet: "Calas",
            value: 5000,
            contractStatus: "IN PROGRESS",
          },
          {
            id: 3,
            pilotCertification: 1234567,
            cargoId: 3,
            description: "minerals to Andvari.",
            originPlanet: "Demeter",
            destinationPlanet: "Andvari",
            value: 7000,
            contractStatus: "FINISHED",
          },
        ];
        expect(response.body).toEqual(answer);
      });
    });

    describe("When gets contracts with contractStatus equals CREATED in asc order", () => {
      it("returns the correct array", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 100 },
          { name: "food", weight: 300 },
          { name: "minerals", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
          { cargoId: 2, resourceId: 2 },
          { cargoId: 3, resourceId: 3 },
        ]);
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234567,
            name: "Matheus",
            age: 22,
            credits: 1000,
            locationPlanet: "Andvari",
          },
        ]);
        await modelsFactory.createList("Contracts", [
          {
            pilotCertification: null,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
          {
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Calas.",
            originPlanet: "Aqua",
            destinationPlanet: "Calas",
            value: 5000,
            contractStatus: "IN PROGRESS",
          },
          {
            pilotCertification: 1234567,
            cargoId: 3,
            description: "minerals to Andvari.",
            originPlanet: "Demeter",
            destinationPlanet: "Andvari",
            value: 7000,
            contractStatus: "FINISHED",
          },
        ]);

        const response = await supertest(app.server)
          .get("/api/contracts" + "?contractStatus=CREATED")
          .expect(200);

        const answer = [
          {
            id: 1,
            pilotCertification: 0,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
        ];
        expect(response.body).toEqual(answer);
      });
    });

    describe("When doesn't have any contracts", () => {
      it("returns empty array", async () => {
        const response = await supertest(app.server)
          .get("/api/contracts")
          .expect(200);

        const answer = [];
        expect(response.body).toEqual(answer);
      });
    });

    describe("When request get all contract route", () => {
      describe("without querystring", () => {
        it("returns bad request response", async () => {
          const querystring = "";

          const response = await supertest(app.server)
            .get(`/api/contracts?contractStatus=${querystring}`)
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with querystring has wrong data type", () => {
        it("returns bad request response", async () => {
          const querystring = 111;

          const response = await supertest(app.server)
            .get(`/api/contracts?contractStatus=${querystring}`)
            .expect(400);
          expect(response.status).toEqual(400);
        });
      });
      describe("with querystring has contractStatus value differ from 'CREATED', 'IN PROGRESS', 'FINISHED'", () => {
        it("returns bad request response", async () => {
          const querystring = "DELETED";

          const response = await supertest(app.server)
            .get(`/api/contracts?contractStatus=${querystring}`)
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
    });
  });

  describe("API :: POST /api/contracts/publish", () => {
    describe("When add a contract with correct values", () => {
      it("returns success message", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
        ]);

        const data = {
          cargoId: 1,
          description: "food to Calas",
          originPlanet: "Andvari",
          destinationPlanet: "Calas",
          value: 5000,
        };

        const response = await supertest(app.server)
          .post("/api/contracts/publish")
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);

        const message = "Contract was added successfully!";

        expect(response.text).toEqual(message);
      });
      it("returns the correct contract", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
        ]);

        const data = {
          cargoId: 1,
          description: "food to Calas",
          originPlanet: "Andvari",
          destinationPlanet: "Calas",
          value: 5000,
        };

        await supertest(app.server)
          .post("/api/contracts/publish")
          .send(data)
          .set("Content-type", "application/json")
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const ContractRepo = repoFactory.create("Contracts");

        expect(
          ContractSerializer.serialize(await ContractRepo.getById(1))
        ).toEqual({
          id: 1,
          pilotCertification: 0,
          cargoId: 1,
          description: "food to Calas",
          originPlanet: "Andvari",
          destinationPlanet: "Calas",
          value: 5000,
          contractStatus: "CREATED",
        });
      });
    });

    describe("When add a contract with invalid origin planet name", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
        ]);

        const data = {
          cargoId: 1,
          description: "food to Calas",
          originPlanet: "Fena",
          destinationPlanet: "Calas",
          value: 700,
        };

        const response = await supertest(app.server)
          .post("/api/contracts/publish")
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError =
          "The origin planet or destination planet is invalid.";
        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When add a contract with invalid cargoId", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
        ]);

        const data = {
          cargoId: 100,
          description: "water to Calas",
          originPlanet: "Aqua",
          destinationPlanet: "Calas",
          value: 700,
        };

        const response = await supertest(app.server)
          .post("/api/contracts/publish")
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        const messageError = `Cargo with id ${data.cargoId} can't be found.`;
        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("When add a contract with invalid destination planet name", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Resources", [
          { name: "water", weight: 1000 },
        ]);
        await modelsFactory.createList("Cargos", [
          { cargoId: 1, resourceId: 1 },
        ]);

        const data = {
          cargoId: 1,
          description: "food to Xalas",
          originPlanet: "Andvari",
          destinationPlanet: "Xalas",
          value: 700,
        };

        const response = await supertest(app.server)
          .post("/api/contracts/publish")
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        const messageError =
          "The origin planet or destination planet is invalid.";
        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("when send a data to route", () => {
      describe("without cargoId property", () => {
        it("returns bad request response", async () => {
          const data = {
            // cargoId: 1,
            description: "food to Xalas",
            originPlanet: "Andvari",
            destinationPlanet: "Xalas",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without description property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            // description: "food to Xalas",
            originPlanet: "Andvari",
            destinationPlanet: "Xalas",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without originPlanet property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: "food to Xalas",
            // originPlanet: "Andvari",
            destinationPlanet: "Xalas",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without destinationPlanet property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: "food to Xalas",
            originPlanet: "Andvari",
            // destinationPlanet: "Xalas",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("without value property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: "food to Xalas",
            originPlanet: "Andvari",
            destinationPlanet: "Xalas",
            // value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in cargoId property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: "1",
            description: "food to Xalas",
            originPlanet: "Andvari",
            destinationPlanet: "Xalas",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in description property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: 321,
            originPlanet: "Andvari",
            destinationPlanet: "Xalas",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in originPlanet property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: "food to Xalas",
            originPlanet: 33,
            destinationPlanet: "Aqua",
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in destinationPlanet property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: "food to Xalas",
            originPlanet: "Aqua",
            destinationPlanet: 33,
            value: 700,
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
      describe("with wrong data type in value property", () => {
        it("returns bad request response", async () => {
          const data = {
            cargoId: 1,
            description: "food to Xalas",
            originPlanet: "Aqua",
            destinationPlanet: 33,
            value: "700",
          };

          const response = await supertest(app.server)
            .post("/api/contracts/publish")
            .send(data)
            .set("Content-type", "application/json")
            .expect(400);

          expect(response.status).toEqual(400);
        });
      });
    });
  });
});
