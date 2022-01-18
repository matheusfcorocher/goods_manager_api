const FulfillContract = require("../../../../src/app/use_cases/contract/FulfillContract");
const { FakeRepositoriesFactory } = require("../../../support/factories");
const Contract = require("../../../../src/domain/entities/Contract");
const Pilot = require("../../../../src/domain/entities/Pilot");

describe("FulfillContract Tests", () => {
  let contracts = [
    new Contract({
      id: 1,
      pilotCertification: null,
      cargoId: 1,
      description: "water, food and minerals to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 4000,
      contractStatus: "CREATED",
    }),
    new Contract({
      id: 2,
      pilotCertification: 1234566,
      cargoId: 2,
      description: "food to Andvari.",
      originPlanet: "Aqua",
      destinationPlanet: "Andvari",
      value: 3000,
      contractStatus: "IN PROGRESS",
    }),
    new Contract({
      id: 3,
      pilotCertification: 1234577,
      cargoId: 3,
      description: "minerals to Aqua.",
      originPlanet: "Demeter",
      destinationPlanet: "Aqua",
      value: 3000,
      contractStatus: "FINISHED",
    }),
    new Contract({
      id: 4,
      pilotCertification: 1234567,
      cargoId: 3,
      description: "minerals to Aqua.",
      originPlanet: "Demeter",
      destinationPlanet: "Aqua",
      value: 5000,
      contractStatus: "IN PROGRESS",
    }),
  ];
  let pilots = [
    new Pilot({
      id: 1,
      pilotCertification: 1234567,
      name: "Matheus",
      age: 22,
      credits: 0,
      locationPlanet: "Aqua",
    }),
    new Pilot({
      id: 2,
      pilotCertification: 1234566,
      name: "Peter",
      age: 20,
      credits: 5000,
      locationPlanet: "Aqua",
    }),
    new Pilot({
      id: 3,
      pilotCertification: 1234577,
      name: "Few",
      age: 24,
      credits: 4500,
      locationPlanet: "Aqua",
    }),
  ];

  let transactions = [];

  const factory = new FakeRepositoriesFactory();
  let fakeContractRepo = factory.create("Contracts", contracts);
  let fakePilotRepo = factory.create("Pilots", pilots);
  let fakeTransactionRepo = factory.create("Transactions", transactions);

  describe("execute", () => {
    describe("When it doesnt find the contract with a given id", () => {
      it("returns not found error exception", async () => {
        const args = { contractsRepository: fakeContractRepo };
        const fulfillContract = new FulfillContract(args);

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id 9 can't be found.`;
        await expect(() => fulfillContract.execute(9)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns not found error exception", async () => {
        const args = {
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
        };
        const fulfillContract = new FulfillContract(args);
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification 0 can't be found.`;
        await expect(() => fulfillContract.execute(1)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("When location planet of pilot isn't the same as the destination planet of contract", () => {
      it("returns validation error exception", async () => {
        const args = {
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          transactionsRepository: fakeTransactionRepo,
        };
        const fulfillContract = new FulfillContract(args);

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Contract 1 is not in progress or the location of pilot isn't the same as the destination planet of contract.`;
        await expect(() => fulfillContract.execute(2)).rejects.toThrow(
          validationError
        );
      });
    });

    describe("When contract doesn't have status equals IN PROGRESS", () => {
      it("returns validation error exception", async () => {
        const args = {
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          transactionsRepository: fakeTransactionRepo,
        };
        const fulfillContract = new FulfillContract(args);
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Contract 3 is not in progress or the location of pilot isn't the same as the destination planet of contract.`;
        await expect(() => fulfillContract.execute(3)).rejects.toThrow(
          validationError
        );
      });
    });

    describe("When a pilot fulfill a contract", () => {
      it("returns the correct result", async () => {
        const args = {
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          transactionsRepository: fakeTransactionRepo,
        };
        const fulfillContract = new FulfillContract(args);
        await expect(fulfillContract.execute(4)).resolves.toEqual(
          "Contract was fullfilled!"
        );
        expect((await fakeTransactionRepo.getById(1)).about).toEqual("Contract 4 Description paid: -₭5000");
        expect((await fakePilotRepo.getById(1)).credits).toEqual(5000);
        expect((await fakeContractRepo.getById(3)).contractStatus).toEqual("FINISHED");
      });
    });
  });
});
