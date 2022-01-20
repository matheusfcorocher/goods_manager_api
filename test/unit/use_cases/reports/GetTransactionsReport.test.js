const GetTransactionsReport = require("../../../../src/app/use_cases/reports/GetTransactionsReport");
const { FakeRepositoriesFactory } = require("../../../support/factories/repository");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();

let transactions = [
    dataFactory.create("Transaction",{id: 1, about: "Mamma mia"}),
    dataFactory.create("Transaction",{id: 2, about: "Mario Kart!"}),
    dataFactory.create("Transaction",{id: 3, about: "Wiiiiiiiii!"}),
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