const CargoWeightDomainService = require("../../../../src/domain/services/CargoWeightDomainService");
const {
  FakeRepositoriesFactory,
} = require("../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();

describe("Domain :: Service :: CargoWeightDomainService", () => {
  let cargos = [
    dataFactory.create("Cargo", { id: 1, resourceIds: [1, 2, 3] }),
    dataFactory.create("Cargo", { id: 2, resourceIds: [2] }),
    dataFactory.create("Cargo", { id: 3, resourceIds: [3] }),
    dataFactory.create("Cargo", { id: 4, resourceIds: [100] }),
    dataFactory.create("Cargo", { id: 5, resourceIds: [] }),
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
    dataFactory.create("Contract", {
      id: 4,
      pilotCertification: 1234111,
      cargoId: 100,
      description: "minerals to Aqua.",
      originPlanet: "Calas",
      destinationPlanet: "Aqua",
      value: 1000,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 5,
      pilotCertification: 1234112,
      cargoId: 4,
      description: "minerals to Aqua.",
      originPlanet: "Calas",
      destinationPlanet: "Aqua",
      value: 1000,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 6,
      pilotCertification: 1234113,
      cargoId: 5,
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
  describe("getCargoWeightByCargoId", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        expect(await service.getCargoWeightByCargoId(1)).toEqual(1400);
      });
    });

    describe("when calculating a cargo with non-existent cargo id", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Cargo with id 100 can't be found.`;

        await expect(() => service.getCargoWeightByCargoId(100)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a cargo that has a non-existent resource id", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id 100 can't be found.`;

        await expect(() => service.getCargoWeightByCargoId(4)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a cargo that doesnt have any resource id", () => {
      it("returns 0", async () => {
        const result = 0;
        expect(await service.getCargoWeightByCargoId(5)).toEqual(result);
      });
    });
  });

  describe("getCargoWeightByContractId", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        expect(await service.getCargoWeightByContractId(2)).toEqual(300);
      });
    });

    describe("when calculating a contract with non-existent contract id ", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id 100 can't be found.`;

        await expect(() => service.getCargoWeightByContractId(100)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a contract with non-existent cargo id ", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Cargo with id 100 can't be found.`;

        await expect(() => service.getCargoWeightByContractId(4)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a contract with cargo that has a non-existent resource id ", () => {
      it("returns not found error", async () => {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id 100 can't be found.`;

        await expect(() => service.getCargoWeightByContractId(5)).rejects.toThrow(
          notFoundError
        );
      });
    });

    describe("when calculating a contract with cargo that doesnt have any resource id", () => {
      it("returns 0", async () => {
        const result = 0;
        expect(await service.getCargoWeightByContractId(6)).toEqual(result);
      });
    });
  });

  describe("getCargoWeightByPilotCertification", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        expect(
          await service.getCargoWeightByPilotCertification(contracts[2].pilotCertification)
        ).toEqual(1000);
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and he doesnt have any contract", () => {
        it("returns object with all properties with 0", async () => {
          const result = 0;
          expect(await service.getCargoWeightByPilotCertification(1234653)).toEqual(result);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract has a non-existent cargo id", () => {
        it("returns not found error", async () => {
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Cargo with id 100 can't be found.`;

          await expect(() =>
            service.getCargoWeightByPilotCertification(1234111)
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract with cargo that has a non-existent resource id", () => {
        it("returns not found error", async () => {
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Resource with id 100 can't be found.`;

          await expect(() =>
            service.getCargoWeightByPilotCertification(1234112)
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
        describe("and his contract with cargo that doesnt have any resource id", () => {
          it("returns object with all properties with 0", async () => {
            const result = 0
    
            expect(await service.getCargoWeightByPilotCertification(1234113)).toEqual(result);
          });
        });
      });
  });
});
