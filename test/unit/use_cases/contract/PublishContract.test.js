const PublishContract = require("../../../../src/app/use_cases/contract/PublishContract");
const {
  FakeRepositoriesFactory,
} = require("../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();
describe("PublishContract Tests", () => {
  let contracts = [];

  const factory = new FakeRepositoriesFactory();
  let fakeContractRepo = factory.create("Contracts", contracts);

  describe("execute", () => {
    describe("When add a contract with correct values", () => {
      it("returns success message", async () => {
        const publishContract = new PublishContract(fakeContractRepo);
        const data = {
          cargoId: 4,
          description: "food to Calas",
          originPlanet: "Andvari",
          destinationPlanet: "Calas",
          value: 700,
        };
        expect(await publishContract.execute(data)).toEqual(
          "Contract was added successfully!"
        );
      });
      it("returns the correct contract", async () => {
        expect(await fakeContractRepo.getById(1)).toEqual(
          dataFactory.create("Contract", {
            id: 1,
            pilotCertification: 0,
            cargoId: 4,
            description: "food to Calas",
            originPlanet: "Andvari",
            destinationPlanet: "Calas",
            value: 700,
            contractStatus: "CREATED",
          })
        );
      });
    });

    describe("When add a contract with invalid origin planet name", () => {
      it("returns validation error", async () => {
        const publishContract = new PublishContract(fakeContractRepo);
        const data = {
          cargoId: 4,
          description: "food to Calas",
          originPlanet: "Fena",
          destinationPlanet: "Calas",
          value: 700,
        };

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors =
          "The origin planet or destination planet is invalid.";
        await expect(() => publishContract.execute(data)).rejects.toThrow(
          validationError
        );
      });
    });

    describe("When add a contract with invalid destination planet name", () => {
      it("returns validation error", async () => {
        const publishContract = new PublishContract(fakeContractRepo);
        const data = {
          cargoId: 4,
          description: "food to Xalas",
          originPlanet: "Andvari",
          destinationPlanet: "Xalas",
          value: 700,
        };
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors =
          "The origin planet or destination planet is invalid.";
        await expect(() => publishContract.execute(data)).rejects.toThrow(
          validationError
        );
      });
    });
  });
});
