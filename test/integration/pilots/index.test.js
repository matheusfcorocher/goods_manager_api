const supertest = require("supertest");
const app = require("../../../app");
const { ModelsFactory } = require("../../support/factories/models");
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
          .set("Accept", "application/json")
          .expect(400);

        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors =
          "Pilot doesn't fit the minimum age for a license or location planet is unknown.";
        console.log(response.body)
        await expect(await response.body).rejects.toThrow({errors:validationError});
      });
    });
  });
});
