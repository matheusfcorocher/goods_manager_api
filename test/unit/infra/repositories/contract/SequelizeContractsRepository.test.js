const SequelizeContractsRepository = require("../../../../../src/infra/repositories/contract/SequelizeContractsRepository");
const { ModelsFactory } = require("../../../../support/factories/models");
const { Contract } = require("../../../../../src/domain/entities");
const { DataFactory } = require("../../../../support/factories/data");
const { setupIntegrationTest } = require("../../../../support/setup");

const modelsFactory = new ModelsFactory();
const dataFactory = new DataFactory();
let repository = new SequelizeContractsRepository(
  modelsFactory.returnModel("Contracts")
);
describe("Infra :: Contract :: SequelizeContractsRepository", () => {
  setupIntegrationTest();
  beforeEach(async () => {
    await modelsFactory.createList("Resources", [
      { name: "water", weight: 100 },
      { name: "food", weight: 300 },
      { name: "minerals", weight: 1000 },
    ]);
    await modelsFactory.createList("Cargos", [
      { cargoId: 1, resourceId: 1 },
      { cargoId: 2, resourceId: 2 },
      { cargoId: 3, resourceId: 3 },
    ]);
    await modelsFactory.createList("Pilots", [
      {
        pilotCertification: 1234567,
        name: "Matheus",
        age: 22,
        credits: 1000,
        locationPlanet: "Andvari",
      },
    ]);
    await modelsFactory.createList("Contracts", [
      {
        pilotCertification: null,
        cargoId: 1,
        description: "water to Demeter.",
        originPlanet: "Aqua",
        destinationPlanet: "Demeter",
        value: 4000,
        contractStatus: "CREATED",
      },
      {
        pilotCertification: 1234567,
        cargoId: 2,
        description: "food to Calas.",
        originPlanet: "Aqua",
        destinationPlanet: "Calas",
        value: 5000,
        contractStatus: "IN PROGRESS",
      },
      {
        pilotCertification: 1234567,
        cargoId: 3,
        description: "minerals to Andvari.",
        originPlanet: "Demeter",
        destinationPlanet: "Andvari",
        value: 7000,
        contractStatus: "FINISHED",
      },
    ]);
  });

  describe("#getById", () => {
    describe("when contract do exist", () => {
      it("returns a contract from the database", async () => {
        const contract = await repository.getById(1);

        expect(contract).toBeInstanceOf(Contract);
        expect(contract).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: null,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          })
        );
      });
    });

    describe("when contract doesn't exist", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id 10 can't be found.`;
        await expect(() => repository.getById(10)).rejects.toThrow(
          notFoundError
        );
      });
    });
  });

  describe("#getByPilotCertification", () => {
    describe("when contract do exist", () => {
      it("returns a contract from the database", async () => {
        const contract = await repository.getByPilotCertification(1234567);

        expect(contract).toHaveLength(2);
        expect(contract[0]).toBeInstanceOf(Contract);
        expect(contract[0]).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Calas.",
            originPlanet: "Aqua",
            destinationPlanet: "Calas",
            value: 5000,
            contractStatus: "IN PROGRESS",
          })
        );
        expect(contract[1]).toBeInstanceOf(Contract);
        expect(contract[1]).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: 1234567,
            cargoId: 3,
            description: "minerals to Andvari.",
            originPlanet: "Demeter",
            destinationPlanet: "Andvari",
            value: 7000,
            contractStatus: "FINISHED",
          })
        );
      });
    });

    describe("when contract doesn't exist", () => {
      it("returns empty array", async () => {
        expect(await repository.getByPilotCertification(1234124)).toEqual([]);
      });
    });
  });

  describe("#getByPilotCertification", () => {
    describe("when contract has no options", () => {
      it("returns contracts from the database", async () => {
        const contract = await repository.getAll();

        expect(contract).toHaveLength(3);
        expect(contract[0]).toBeInstanceOf(Contract);
        expect(contract[0]).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: null,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          })
        );
        expect(contract[1]).toBeInstanceOf(Contract);
        expect(contract[1]).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: 1234567,
            cargoId: 2,
            description: "food to Calas.",
            originPlanet: "Aqua",
            destinationPlanet: "Calas",
            value: 5000,
            contractStatus: "IN PROGRESS",
          })
        );
        expect(contract[2]).toBeInstanceOf(Contract);
        expect(contract[2]).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: 1234567,
            cargoId: 3,
            description: "minerals to Andvari.",
            originPlanet: "Demeter",
            destinationPlanet: "Andvari",
            value: 7000,
            contractStatus: "FINISHED",
          })
        );
      });
    });

    describe("when contract has CREATED in option", () => {
      it("returns contracts from the database that has contractStatus equals CREATED", async () => {
        const contract = await repository.getAll("CREATED");

        expect(contract).toHaveLength(1);
        expect(contract[0]).toBeInstanceOf(Contract);
        expect(contract[0]).toEqual(
          dataFactory.create("Contract", {
            pilotCertification: null,
            cargoId: 1,
            description: "water to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          })
        );
      });
    });
  });

  describe("#add", () => {
    describe("when adding a contract to the database", () => {
      it("returns a the new contract", async () => {
        const contract = dataFactory.create("Contract", {
          pilotCertification: null,
          cargoId: 1,
          description: "minerals to Demeter.",
          originPlanet: "Calas",
          destinationPlanet: "Demeter",
          value: 10000,
          contractStatus: "CREATED",
        });

        await repository.add(contract);

        const newContract = await repository.getById(4);
        expect(newContract).toBeInstanceOf(Contract);
        expect(newContract).toEqual(contract);
      });
    });

    describe("when the new contract doesn't have cargoId, description, originPlanet, destinationPlanet, value", () => {
      it("returns validation error", async () => {
        const contract = dataFactory.create("Contract", {
          pilotCertification: null,
          contractStatus: "CREATED",
        });
        let errors = [
          { message: '"cargoId" is required', path: ["cargoId"] },
          { message: '"description" is required', path: ["description"] },
          { message: '"originPlanet" is required', path: ["originPlanet"] },
          {
            message: '"destinationPlanet" is required',
            path: ["destinationPlanet"],
          },
          { message: '"value" is required', path: ["value"] },
        ];
        const validationError = new Error("Validation error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = errors;
        await expect(() => repository.add(contract)).rejects.toThrow(
          validationError
        );
      });
    });
  });
});
