const CargoWeightDomainService = require("../../../../src/domain/services/CargoWeightDomainService");
const {
  FakeRepositoriesFactory,
} = require("../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();

describe("CargoWeightDomainService tests", () => {
  let cargos = [
    dataFactory.create("Cargo", { id: 1, resourceIds: [1, 2, 3] }),
    dataFactory.create("Cargo", { id: 2, resourceIds: [2] }),
    dataFactory.create("Cargo", { id: 3, resourceIds: [3] }),
  ];

  let resources = [
    dataFactory.create("Resource", { id: 1, name: "water", weight: 100 }),
    dataFactory.create("Resource", { id: 2, name: "food", weight: 300 }),
    dataFactory.create("Resource", { id: 3, name: "minerals", weight: 1000 }),
  ];

  let contracts = [
    dataFactory.create("Contract", {
      id: 1,
      pilotCertification: 1234567,
      cargoId: 1,
      description: "water, food and minerals to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 4000,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 2,
      pilotCertification: 1234567,
      cargoId: 2,
      description: "food to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 1500,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 3,
      pilotCertification: 1234557,
      cargoId: 3,
      description: "minerals to Aqua.",
      originPlanet: "Calas",
      destinationPlanet: "Aqua",
      value: 1000,
      contractStatus: "IN PROGRESS",
    }),
  ];

  const factory = new FakeRepositoriesFactory();
  let fakeCargoRepo = factory.create("Cargos", cargos);
  let fakeContractRepo = factory.create("Contracts", contracts);
  let fakeResourceRepo = factory.create("Resources", resources);
  const args = {
    cargoRepository: fakeCargoRepo,
    contractRepository: fakeContractRepo,
    resourceRepository: fakeResourceRepo,
  };
  const service = new CargoWeightDomainService(args);
  describe("getCargoWeight", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        expect(await service.getCargoWeight(1)).toEqual(1400);
      });
    });
  });

  describe("getCargoWeightContract", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        expect(await service.getCargoWeightContract(2)).toEqual(300);
      });
    });
  });

  describe("getCargoWeightPilot", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        expect(
          await service.getCargoWeightPilot(contracts[2].pilotCertification)
        ).toEqual(1000);
      });
    });
  });
});