const GetTransactionsReport = require("../../../../../src/app/use_cases/reports/GetTransactionsReport");
const {
  FakeRepositoriesFactory,
} = require("../../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../../support/factories/data");

const dataFactory = new DataFactory();

let transactions = [
  dataFactory.create("Transaction", { id: 1, about: "Mamma mia" }),
  dataFactory.create("Transaction", { id: 2, about: "Mario Kart!" }),
  dataFactory.create("Transaction", { id: 3, about: "Wiiiiiiiii!" }),
];

const factory = new FakeRepositoriesFactory();
let fakeTransactionRepo = factory.create("Transactions", transactions);

describe("App :: UseCases :: GetTransactionsReport", () => {
  describe("#execute", () => {
    describe("when it gets transactions report", () => {
      it("returns the correct report", async () => {
        const getTransactionsReport = new GetTransactionsReport(
          fakeTransactionRepo
        );
        const answer = ["Mamma mia", "Mario Kart!", "Wiiiiiiiii!"];
        expect(await getTransactionsReport.execute()).toEqual(answer);
      });
    });

    describe("when doesnt have any transactions", () => {
      it("returns empty array", async () => {
        fakeTransactionRepo = factory.create("Transactions", []);
        const getTransactionsReport = new GetTransactionsReport(
          fakeTransactionRepo
        );
        const answer = [];
        expect(await getTransactionsReport.execute()).toEqual(answer);
      });
    });

    describe("When user try to get planets reports", () => {
      it("but only returns internal error", async () => {
        const error = new Error("Internal Error");
        error.original = { detail: `Server instance is not available!` };
        fakeTransactionRepo = factory.create("Transactions", []);
        fakeTransactionRepo.getAll = () => {
          throw error;
        };
        const getTransactionsReport = new GetTransactionsReport(
          fakeTransactionRepo
        );
        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;

        await expect(() => getTransactionsReport.execute()).rejects.toThrow(
          internalError
        );
      });
    });
  });
});
