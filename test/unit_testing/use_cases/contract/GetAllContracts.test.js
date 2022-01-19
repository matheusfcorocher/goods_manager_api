const GetAllContracts = require("../../../../src/app/use_cases/contract/GetAllContracts");
const {
  FakeRepositoriesFactory,
} = require("../../../support/factories/repository");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();
describe("GetAllContracts Tests", () => {
  let contracts = [
    dataFactory.create("Contract", {
      id: 1,
      pilotCertification: 0,
      cargoId: 1,
      description: "water, food and minerals to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 4000,
      contractStatus: "CREATED",
    }),
    dataFactory.create("Contract", {
      id: 3,
      pilotCertification: 1234577,
      cargoId: 3,
      description: "minerals to Aqua.",
      originPlanet: "Demeter",
      destinationPlanet: "Aqua",
      value: 3000,
      contractStatus: "FINISHED",
    }),
    dataFactory.create("Contract", {
      id: 4,
      pilotCertification: 1234567,
      cargoId: 3,
      description: "minerals to Aqua.",
      originPlanet: "Demeter",
      destinationPlanet: "Aqua",
      value: 5000,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 2,
      pilotCertification: 1234566,
      cargoId: 2,
      description: "food to Andvari.",
      originPlanet: "Aqua",
      destinationPlanet: "Andvari",
      value: 3000,
      contractStatus: "IN PROGRESS",
    }),
  ];

  let contracts2 = [];

  const factory = new FakeRepositoriesFactory();
  let fakeContractRepo = factory.create("Contracts", contracts);
  let fakeContractRepo2 = factory.create("Contracts", contracts2);
  describe("execute", () => {
    describe("When gets contracts with asc order", () => {
      it("returns the correct array", async () => {
        const getAllContracts = new GetAllContracts(fakeContractRepo);

        expect(await getAllContracts.execute()).toEqual([
          {
            id: 1,
            pilotCertification: 0,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
          {
            id: 2,
            pilotCertification: 1234566,
            cargoId: 2,
            description: "food to Andvari.",
            originPlanet: "Aqua",
            destinationPlanet: "Andvari",
            value: 3000,
            contractStatus: "IN PROGRESS",
          },
          {
            id: 3,
            pilotCertification: 1234577,
            cargoId: 3,
            description: "minerals to Aqua.",
            originPlanet: "Demeter",
            destinationPlanet: "Aqua",
            value: 3000,
            contractStatus: "FINISHED",
          },
          {
            id: 4,
            pilotCertification: 1234567,
            cargoId: 3,
            description: "minerals to Aqua.",
            originPlanet: "Demeter",
            destinationPlanet: "Aqua",
            value: 5000,
            contractStatus: "IN PROGRESS",
          },
        ]);
      });
    });

    describe("When gets contracts with contractStatus equals CREATED in asc order", () => {
      it("returns the correct array", async () => {
        const getAllContracts = new GetAllContracts(fakeContractRepo);

        expect(await getAllContracts.execute("CREATED")).toEqual([
          {
            id: 1,
            pilotCertification: 0,
            cargoId: 1,
            description: "water, food and minerals to Demeter.",
            originPlanet: "Aqua",
            destinationPlanet: "Demeter",
            value: 4000,
            contractStatus: "CREATED",
          },
        ]);
      });
    });

    describe("When doesn't have any contracts", () => {
      it("returns empty array", async () => {
        const getAllContracts = new GetAllContracts(fakeContractRepo2);

        expect(await getAllContracts.execute()).toEqual([]);
      });
    });
  });
});
