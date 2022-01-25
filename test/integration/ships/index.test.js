const supertest = require("supertest");
const app = require("../../../app");
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
  describe("PUT /api/ships/refill/:pilotCertification", () => {
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

        let pilotCertification = 1234666

        const response = await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(404);

        let messageError =
        `Pilot with pilotCertification ${pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("when doesnt find ship by given pilot certification", () => {
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
            pilotCertification: 1234666,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);

        let pilotCertification = 1234666

        const response = await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(404);

        let messageError =
        `Ship with pilotCertification ${pilotCertification} can't be found.`;

        expect(response.body).toEqual({ message: messageError });
      });
    });

    describe("when try to refill a ship with fuelLevel at maximum", () => {
      it("returns validation error", async () => {
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234666,
            name: "Carlos",
            age: 20,
            credits: 500,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Ships", [
          {
            pilotCertification: 1234666,
            fuelLevel: 1000,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);
        let pilotCertification = 1234666

        const response = await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(400);

        let messageError =
        "The fuel capacity of the ship is full!";

        expect(response.body).toEqual({ message: messageError });        
      })
    })

    describe("when ship refills", () => {
      it("returns the correct message", async () => {
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234666,
            name: "Kael",
            age: 20,
            credits: 7,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Ships", [
          {
            pilotCertification: 1234666,
            fuelLevel: 500,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);
        let pilotCertification = 1234666

        const response = await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(200);

        let message =
        "The fuel of the ship was refilled!";

        expect(response.text).toEqual(message);
      })
      it("was created transaction", async () => {
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234666,
            name: "Kael",
            age: 20,
            credits: 7,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Ships", [
          {
            pilotCertification: 1234666,
            fuelLevel: 500,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);
        let pilotCertification = 1234666

        await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const TransactionRepo = repoFactory.create("Transactions");
        
        expect((await TransactionRepo.getById(1)).about).toEqual(`Kael bought fuel: +₭7`);
      });
      it("was updated credits of pilot", async () => {
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234666,
            name: "Kael",
            age: 20,
            credits: 7,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Ships", [
          {
            pilotCertification: 1234666,
            fuelLevel: 500,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);
        let pilotCertification = 1234666

        await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const PilotRepo = repoFactory.create("Pilots");
        
        expect((await PilotRepo.getByPilotCertification(1234666)).credits).toEqual(0);
      });
      it('was updated fuelLevel of ship', async () => {
        await modelsFactory.createList("Pilots", [
          {
            pilotCertification: 1234666,
            name: "Kael",
            age: 20,
            credits: 7,
            locationPlanet: "Demeter",
          },
        ]);
        await modelsFactory.createList("Ships", [
          {
            pilotCertification: 1234666,
            fuelLevel: 500,
            fuelCapacity: 1000,
            weightCapacity: 1000,
          }
        ]);
        let pilotCertification = 1234666

        await supertest(app.server)
          .put("/api/ships/refill/" + pilotCertification)
          .expect(200);

        const repoFactory = new RepositoriesFactory();
        const ShipRepo = repoFactory.create("Ships");
        
        expect((await ShipRepo.getByPilotCertification(1234666)).fuelLevel).toEqual(501);
      });
    })
  });
});
