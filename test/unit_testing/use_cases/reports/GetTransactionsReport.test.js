const GetTransactionsReport = require("../../../../src/app/use_cases/reports/GetTransactionsReport");
const Transaction = require("../../../../src/domain/entities/Transaction");
const { FakeRepositoriesFactory } = require("../../../support/factories");

let transactions = [
    new Transaction({id: 1, about: "Mamma mia"}),
    new Transaction({id: 2, about: "Mario Kart!"}),
    new Transaction({id: 3, about: "Wiiiiiiiii!"}),
]

const factory = new FakeRepositoriesFactory();
let fakeTransactionRepo = factory.create("Transactions", transactions);

describe("GetTransactionsReport", () => {
    describe("execute", () => {
        describe("when it gets transactions report", () => {
            it("returns the correct report", async () => {
                const getTransactionsReport = new GetTransactionsReport(fakeTransactionRepo);
                const answer = [
                    "Mamma mia",
                    "Mario Kart!",
                    "Wiiiiiiiii!"
                ];
                expect(await getTransactionsReport.execute()).toEqual(answer);
            })
        })

        describe("when doesnt have any transactions", () => {
            it("returns empty array", async () => {
                fakeTransactionRepo = factory.create("Transactions", []);
                const getTransactionsReport = new GetTransactionsReport(fakeTransactionRepo);
                const answer = [];
                expect(await getTransactionsReport.execute()).toEqual(answer);
            })
        })
    })
})