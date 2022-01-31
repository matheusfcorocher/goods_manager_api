const SequelizeTransactionsRepository = require("../../../../../src/infra/repositories/transaction/SequelizeTransactionsRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Transaction } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizeTransactionsRepository(
  modelsFactory.returnModel("Transactions")
);
describe("Infra :: Transaction :: SequelizeTransactionsRepository", () => {
  setupIntegrationTest();
  beforeEach(async () => {
    await modelsFactory.createList("Transactions", [
      {
        about: "Contract 5 paid Han solo a coke and 'coxinha'",
      },
      {
        about: "Contract 6 paid Baby Yoda a new cradle",
      },
    ]);
  });

  describe("#add", () => {
    describe("when adding a transaction to the database", () => {
      it("returns the new transaction", async () => {
        const transaction = dataFactory.create("Transaction", {
          about: "Its all about family",
        });

        const newTransaction = await repository.add(transaction);

        expect(newTransaction).toBeInstanceOf(Transaction);
        expect(newTransaction).toEqual(transaction);
      });
    });

    describe("when the new transaction doesn't have about", () => {
      it("returns validation error", async () => {
        const transaction = dataFactory.create("Transaction", {});
        let errors = [
          {
            message: '"about" is required',
            path: ["about"],
          },
        ];
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = errors;
        await expect(() => repository.add(transaction)).rejects.toThrow(
          validationError
        );
      });
    });
  });

  describe("#getById", () => {
    describe("when transaction do exist", () => {
      it("returns a transaction from the database", async () => {
        const transaction = await repository.getById(1);

        expect(transaction).toBeInstanceOf(Transaction);
        expect(transaction).toEqual(
          dataFactory.create("Transaction", {
            about: "Contract 5 paid Han solo a coke and 'coxinha'",
          })
        );
      });
    });

    describe("when transaction doesn't exist", () => {
      it("returns not found error", async () => {
        const id = 10;
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Transaction with id ${id} can't be found.`;
        await expect(() => repository.getById(id)).rejects.toThrow(
          notFoundError
        );
      });
    });
  });

  describe("#getAll", () => {
    describe("when transactions do exist", () => {
      it("returns transactions from the database", async () => {
        const contract = await repository.getAll();

        expect(contract).toHaveLength(2);
        expect(contract[0]).toBeInstanceOf(Transaction);
        expect(contract[0]).toEqual(
          dataFactory.create("Transaction", {
            about: "Contract 5 paid Han solo a coke and 'coxinha'",
          })
        );

        expect(contract[1]).toBeInstanceOf(Transaction);
        expect(contract[1]).toEqual(
          dataFactory.create("Transaction", {
            about: "Contract 6 paid Baby Yoda a new cradle",
          })
        );
      });
    });
  });
});
