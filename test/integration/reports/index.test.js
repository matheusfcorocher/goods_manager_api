const supertest = require("supertest");
const app = require("../../../app");
const { ModelsFactory } = require("../../support/factories/models");
const { setupIntegrationTest } = require("../../support/setup");

const modelsFactory = new ModelsFactory();

describe("Reports Routes Tests", () => {
  setupIntegrationTest(app);
  describe("GET /api/reports/transactions", () => {
    describe("When has transactions in db", () => {
      it("returns a valid report", async () => {
        await modelsFactory.createList("Transactions", [
          { id: "1", about: "Mamma" },
          { id: "2", about: "Mia" },
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

  describe("GET /api/reports/pilots", () => {
    describe("When has transactions in db", () => {
      it("returns a valid report", async () => {
        await modelsFactory.createList("Transactions", [
          { id: "1", about: "Mamma" },
          { id: "2", about: "Mia" },
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
          .get("/api/reports/pilots")
          .expect(200);
  
        expect(response.body).toEqual([]);
    });
    });
  });
});
