const Cargo = require("../../../../src/domain/entities/Cargo");
const Contract = require("../../../../src/domain/entities/Contract");
const Resource = require("../../../../src/domain/entities/Resource");
const CargoAllResourcesDomainService = require("../../../../src/domain/services/CargoAllResourcesDomainService");
const { FakeRepositoriesFactory } = require("../../../support/factories");

describe("CargoAllResourcesDomainService tests", () => {
  let cargos = [
    new Cargo({ id: 1, resourceIds: [1, 2, 3] }),
    new Cargo({ id: 2, resourceIds: [2] }),
    new Cargo({ id: 3, resourceIds: [3] }),
  ];

  let resources = [
    new Resource({ id: 1, name: "water", weight: 100 }),
    new Resource({ id: 2, name: "food", weight: 300 }),
    new Resource({ id: 3, name: "minerals", weight: 1000 }),
  ];

  let contracts = [
    new Contract({
      id: 1,
      pilotCertification: 1234567,
      cargoId: 1,
      description: "water, food and minerals to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 4000,
      contractStatus: "IN PROGRESS",
    }),
    new Contract({
      id: 2,
      pilotCertification: 1234567,
      cargoId: 2,
      description: "food to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 1500,
      contractStatus: "IN PROGRESS",
    }),
    new Contract({
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
  let fakeCargoRepo = factory.create('Cargos', cargos);
  let fakeResourceRepo = factory.create('Resources', resources);
  let fakeContractRepo = factory.create('Contracts', contracts);
  const args = { cargoRepository: fakeCargoRepo, contractRepository: fakeContractRepo, resourceRepository: fakeResourceRepo };
  const service = new CargoAllResourcesDomainService(args);
  describe("getCargoAllResources", () => {
    describe("when calculating the total resources cargo has", () => {
      it("returns correctly all resources", async () => {
        const result = {
          water: 100,
          food: 300,
          minerals: 1000,
        };
        expect(await service.getAllResourcesCargo(1)).toEqual(result);
      });
    });
  });

  describe("getAllResourcesContract", () => {
    describe("when calculating the total resources contract has", () => {
      it("returns correctly all resources", async () => {
        const result = {
          water: 100,
          food: 300,
          minerals: 1000,
        };
        expect(await service.getAllResourcesContract(1)).toEqual(result);
      });
    });
  });

  describe("getAllResourcesPilot", () => {
    describe("when calculating the total resources contract has", () => {
      it("returns correctly all resources", async () => {
        const result = {
          water: 100,
          food: 600,
          minerals: 1000,
        };
        expect(
          await service.getAllResourcesPilot(contracts[1].pilotCertification)
        ).toEqual(result);
      });
    });
  });
});
