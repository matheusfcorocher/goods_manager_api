const PublishContract = require("../../../../src/app/use_cases/contract/PublishContract");
const Contract = require("../../../../src/domain/entities/Contract");
const { FakeRepositoriesFactory } = require("../../../support/factories");

describe("PublishContract Tests", () => {
  let contracts = [];

  const factory = new FakeRepositoriesFactory();
  let fakeContractRepo = factory.create("Contracts", contracts);

  describe("execute", () => {
    describe("When add a contract with correct values", () => {
      it("returns the correct contract", async () => {
        const publishContract = new PublishContract(fakeContractRepo);
        const data = {
          cargoId: 4,
          description: "food to Calas",
          originPlanet: "Andvari",
          destinationPlanet: "Calas",
          value: 700,
        };
        await publishContract.execute(data);
        expect(await fakeContractRepo.getById(1)).toEqual(
          new Contract({
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
