const supertest = require("supertest");
const app = require("../../../app");
const { setupIntegrationTest } = require("../../support/setup");

describe("Reports Routes Tests", () => {
  describe("GET /api/reports/transactions", () => {
    describe("When acess the route", () => {
      setupIntegrationTest();

      it("returns a valid report", async () => {
        await supertest(app.server)
          .get("/api/reports/transactions")
          .expect(200)
          .then((response) => {
            console.log(response);
            expect(response).toBe([]);
          });
      });
    });
  });
});
