const Cargo = require("../../../../src/domain/entities/Cargo");
const Contract = require("../../../../src/domain/entities/Contract");
const Resource = require("../../../../src/domain/entities/Resource");
const CargoWeightDomainService = require("../../../../src/domain/services/CargoWeightDomainService");
const { fakeCargoRepository, fakeResourceRepository, fakeContractRepository } = require("../../../support/factories/cargo");

describe("CargoWeightDomainService tests", () => {
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

  let fakeCargoRepo = new fakeCargoRepository(cargos);
  let fakeResourceRepo = new fakeResourceRepository(resources);
  let fakeContractRepo = new fakeContractRepository(contracts);
  const args = { cargoRepository: fakeCargoRepo, contractRepository: fakeContractRepo, resourceRepository: fakeResourceRepo };
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
        expect(await service.getCargoWeightPilot(contracts[2].pilotCertification)).toEqual(1000);
      });
    });
  });
});
