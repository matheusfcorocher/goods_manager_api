const Cargo = require("../../../../src/domain/entities/Cargo");
const Contract = require("../../../../src/domain/entities/Contract");
const Resource = require("../../../../src/domain/entities/Resource");
const CargoAllResourcesDomainService = require("../../../../src/domain/services/CargoAllResourcesDomainService");
const {
  FakeRepositoriesFactory,
} = require("../../../support/factories/repository/FakeRepositoriesFactory.js");

describe("Domain :: Service :: CargoAllResourcesDomainService", () => {
  let cargos = [
    new Cargo({ id: 1, resourceIds: [1, 2, 3] }),
    new Cargo({ id: 2, resourceIds: [2] }),
    new Cargo({ id: 3, resourceIds: [3] }),
    new Cargo({ id: 5, resourceIds: [7] }),
    new Cargo({ id: 8, resourceIds: [] }),
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
    new Contract({
      id: 11,
      pilotCertification: 1234551,
      cargoId: 8,
      description: "minerals to Aqua.",
      originPlanet: "Calas",
      destinationPlanet: "Aqua",
      value: 1000,
      contractStatus: "IN PROGRESS",
    }),
    new Contract({
      id: 10,
      pilotCertification: 1222227,
      cargoId: 5,
      description: "minerals to Aqua.",
      originPlanet: "Calas",
      destinationPlanet: "Aqua",
      value: 1000,
      contractStatus: "IN PROGRESS",
    }),
    new Contract({
      id: 20,
      pilotCertification: 1111111,
      cargoId: 10,
      description: "minerals to Aqua.",
      originPlanet: "Calas",
      destinationPlanet: "Aqua",
      value: 1000,
      contractStatus: "IN PROGRESS",
    }),
  ];

  const factory = new FakeRepositoriesFactory();
  let fakeCargoRepo = factory.create("Cargos", cargos);
  let fakeResourceRepo = factory.create("Resources", resources);
  let fakeContractRepo = factory.create("Contracts", contracts);
  const args = {
    cargoRepository: fakeCargoRepo,
    contractRepository: fakeContractRepo,
    resourceRepository: fakeResourceRepo,
  };
  const service = new CargoAllResourcesDomainService(args);
  describe("getCargoAllResources", () => {
    describe("when calculating the total resources cargo has", () => {
      it("returns correctly all resources", async () => {
        const result = {
          water: 100,
          food: 300,
          minerals: 1000,
        };
        expect(await service.getAllResourcesByCargoId(1)).toEqual(result);
      });
    });
    describe("when calculating a cargo with non-existent cargo id", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Cargo with id 4 can't be found.`;

        await expect(() => service.getAllResourcesByCargoId(4)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a cargo that has a non-existent resource id", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id 7 can't be found.`;

        await expect(() => service.getAllResourcesByCargoId(5)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a cargo that doesnt have any resource id", () => {
      it("returns object with all properties with 0", async () => {
        const result = {
          water: 0,
          food: 0,
          minerals: 0,
        };
        expect(await service.getAllResourcesByCargoId(8)).toEqual(result);
      });
    });
  });

  describe("getAllResourcesByContractId", () => {
    describe("when calculating the total resources contract has", () => {
      it("returns correctly all resources", async () => {
        const result = {
          water: 100,
          food: 300,
          minerals: 1000,
        };
        expect(await service.getAllResourcesByContractId(1)).toEqual(result);
      });
    });
    describe("when calculating a contract with non-existent contract id ", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id 100 can't be found.`;

        await expect(() =>
          service.getAllResourcesByContractId(100)
        ).rejects.toThrow(notFoundError);
      });
    });
    describe("when calculating a contract with non-existent cargo id ", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Cargo with id 10 can't be found.`;

        await expect(() => service.getAllResourcesByContractId(20)).rejects.toThrow(
          notFoundError
        );
      });
    });
    describe("when calculating a contract with cargo that has a non-existent resource id ", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id 7 can't be found.`;

        await expect(() => service.getAllResourcesByContractId(10)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a contract with cargo that doesnt have any resource id", () => {
      it("returns object with all properties with 0", async () => {
        const result = {
          water: 0,
          food: 0,
          minerals: 0,
        };
        expect(await service.getAllResourcesByContractId(11)).toEqual(result);
      });
    });
  });

  describe("getAllResourcesByPilotCertification", () => {
    describe("when calculating the total resources that a pilot has", () => {
      it("returns correctly all resources", async () => {
        const result = {
          water: 100,
          food: 600,
          minerals: 1000,
        };
        expect(
          await service.getAllResourcesByPilotCertification(contracts[1].pilotCertification)
        ).toEqual(result);
      });
    });
    describe("when calculating the total resources that a pilot has", () => {
      describe("and he doesnt have any contract", () => {
        it("returns object with all properties with 0", async () => {
          const result = {
            water: 0,
            food: 0,
            minerals: 0,
          };
          expect(await service.getAllResourcesByPilotCertification(1234566)).toEqual(result);
        });
      });
    });
    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract has a non-existent cargo id", () => {
        it("returns not found error", async () => {
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Cargo with id 10 can't be found.`;

          await expect(() =>
            service.getAllResourcesByPilotCertification(1111111)
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract with cargo that has a non-existent resource id", () => {
        it("returns not found error", async () => {
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Resource with id 7 can't be found.`;

          await expect(() =>
            service.getAllResourcesByPilotCertification(1222227)
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract with cargo that doesnt have any resource id", () => {
        it("returns object with all properties with 0", async () => {
          const result = {
            water: 0,
            food: 0,
            minerals: 0,
          };

          expect(await service.getAllResourcesByPilotCertification(1234551)).toEqual(result);
        });
      });
    });
  });
});
