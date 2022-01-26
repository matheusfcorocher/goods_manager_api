const supertest = require("supertest");
const app = require("../../../app");
const { ModelsFactory } = require("../../support/factories/models");
const {
  RepositoriesFactory,
} = require("../../support/factories/repository/RepositoriesFactory");
const { setupIntegrationTest } = require("../../support/setup");

const modelsFactory = new ModelsFactory();

describe("Contract Routes Tests", () => {
  setupIntegrationTest(app);
  describe("PUT /api/contracts/accept/:id", () => {
    describe("When it doesnt find the contract with a given id", () => {
      it("returns not found error", async () => {
        let data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 100)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        let messageError = `Contract with id 100 can't be found.`;

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
        let data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        let messageError = `Pilot with pilotCertification ${data.pilotCertification} can't be found.`;

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

        let data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        let messageError = `Contract 1 isn't available or pilot isn't in the origin planet of contract.`;

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
        let data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        let messageError = `Contract 1 isn't available or pilot isn't in the origin planet of contract.`;

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
        let data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(404);

        let messageError = `Ship with pilotCertification 1234567 can't be found.`;

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
        let data = {
          pilotCertification: 1234567,
        };
        const response = await supertest(app.server)
          .put("/api/contracts/accept/" + 1)
          .send(data)
          .set("Content-type", "application/json")
          .expect(400);

        let messageError = `The ship can't carry the required weight of contract`;

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
        let data = {
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
  });

  describe("PUT /api/contracts/fulfill/:id", () => {
    describe("When it doesnt find the contract with a given id", () => {
      it("returns not found error", async () => {
        const response = await supertest(app.server)
          .put("/api/contracts/fulfill/" + 100)
          .expect(404);

        let messageError = `Contract with id 100 can't be found.`;

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

        let messageError = `Pilot with pilotCertification 0 can't be found.`;

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

        let messageError = `Contract 1 is not in progress or the location of pilot isn't the same as the destination planet of contract.`;

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

        let messageError = `Contract 1 is not in progress or the location of pilot isn't the same as the destination planet of contract.`;

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

        let message = "Contract was fullfilled!";

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
  });

  describe("GET /api/contracts", () => {
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
          .get("/api/contracts"+"?contractStatus=CREATED")
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
          }
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
  });

  //   describe("POST /api/contracts/publish", () => {
  //   });
});
