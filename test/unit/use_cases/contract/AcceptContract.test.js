const AcceptContract = require("../../../../src/app/use_cases/contract/AcceptContract");
const { FakeRepositoriesFactory } = require("../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();

describe("App :: UseCases :: AcceptContract", () => {
  let cargos = [
    dataFactory.create("Cargo", { id: 1, resourceIds: [1, 2, 3] }),
    dataFactory.create("Cargo", { id: 2, resourceIds: [2] }),
    dataFactory.create("Cargo", { id: 3, resourceIds: [3] }),
    dataFactory.create("Cargo", { id: 4, resourceIds: [4] }),
    dataFactory.create("Cargo", { id: 20, resourceIds: [100] }),
  ];

  let resources = [
    dataFactory.create("Resource", { id: 1, name: "water", weight: 100 }),
    dataFactory.create("Resource", { id: 2, name: "food", weight: 300 }),
    dataFactory.create("Resource", { id: 3, name: "minerals", weight: 1000 }),
    dataFactory.create("Resource", { id: 4, name: "food", weight: 2000 }),
  ];

  let contracts = [
    dataFactory.create("Contract", {
      id: 1,
      pilotCertification: null,
      cargoId: 1,
      description: "water, food and minerals to Demeter.",
      originPlanet: "Aqua",
      destinationPlanet: "Demeter",
      value: 4000,
      contractStatus: "CREATED",
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
      description: "minerals to Demeter.",
      originPlanet: "Calas",
      destinationPlanet: "Demeter",
      value: 1000,
      contractStatus: "CREATED",
    }),
    dataFactory.create("Contract", {
      id: 5,
      pilotCertification: null,
      cargoId: 4,
      description: "food to Calas.",
      originPlanet: "Demeter",
      destinationPlanet: "Calas",
      value: 4000,
      contractStatus: "CREATED",
    }),
    dataFactory.create("Contract", {
      id: 15,
      pilotCertification: 1234444,
      cargoId: 100,
      description: "food to Calas.",
      originPlanet: "Demeter",
      destinationPlanet: "Calas",
      value: 4000,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 20,
      pilotCertification: 1234333,
      cargoId: 20,
      description: "food to Calas.",
      originPlanet: "Demeter",
      destinationPlanet: "Calas",
      value: 4000,
      contractStatus: "IN PROGRESS",
    }),
    dataFactory.create("Contract", {
      id: 16,
      pilotCertification: null,
      cargoId: 100,
      description: "food to Calas.",
      originPlanet: "Demeter",
      destinationPlanet: "Calas",
      value: 4000,
      contractStatus: "CREATED",
    }),
    dataFactory.create("Contract", {
      id: 17,
      pilotCertification: null,
      cargoId: 20,
      description: "food to Calas.",
      originPlanet: "Demeter",
      destinationPlanet: "Calas",
      value: 4000,
      contractStatus: "CREATED",
    }),
  ];
  let pilots = [
    dataFactory.create("Pilot", {
      id: 1,
      pilotCertification: 1234567,
      name: "Matheus",
      age: 22,
      credits: 0,
      locationPlanet: "Aqua",
    }),
    dataFactory.create("Pilot", {
      id: 2,
      pilotCertification: 1234566,
      name: "Peter",
      age: 20,
      credits: 5000,
      locationPlanet: "Aqua",
    }),
    dataFactory.create("Pilot", {
      id: 3,
      pilotCertification: 1234577,
      name: "Tom",
      age: 24,
      credits: 2000,
      locationPlanet: "Calas",
    }),
    dataFactory.create("Pilot", {
      id: 4,
      pilotCertification: 1234588,
      name: "Jerry",
      age: 30,
      credits: 2000,
      locationPlanet: "Demeter",
    }),
    dataFactory.create("Pilot", {
      id: 5,
      pilotCertification: 1234444,
      name: "Sully",
      age: 60,
      credits: 100,
      locationPlanet: "Aqua",
    }),
    dataFactory.create("Pilot", {
      id: 6,
      pilotCertification: 1234333,
      name: "Ethan",
      age: 40,
      credits: 100,
      locationPlanet: "Aqua",
    }),
  ];
  let ships = [
    dataFactory.create("Ship", {
      id: 1,
      pilotCertification: 1234567,
      fuelCapacity: 1500,
      fuelLevel: 50,
      weightCapacity: 2000,
    }),
    dataFactory.create("Ship", {
      id: 2,
      pilotCertification: 1234566,
      fuelCapacity: 1500,
      fuelLevel: 500,
      weightCapacity: 1000,
    }),
    dataFactory.create("Ship", {
      id: 3,
      pilotCertification: 1234588,
      fuelCapacity: 1500,
      fuelLevel: 500,
      weightCapacity: 1999,
    }),
    dataFactory.create("Ship", {
      id: 3,
      pilotCertification: 1234444,
      fuelCapacity: 1500,
      fuelLevel: 500,
      weightCapacity: 1999,
    }),
    dataFactory.create("Ship", {
      id: 4,
      pilotCertification: 1234333,
      fuelCapacity: 1500,
      fuelLevel: 500,
      weightCapacity: 1999,
    }),
  ];

  const factory = new FakeRepositoriesFactory();
  let fakeCargoRepo = factory.create("Cargos", cargos);
  let fakeContractRepo = factory.create("Contracts", contracts);
  let fakePilotRepo = factory.create("Pilots", pilots);
  let fakeShipRepo = factory.create("Ships", ships);
  let fakeResourceRepo = factory.create("Resources", resources);

  describe("#execute", () => {
    describe("When it doesnt find the contract with a given id", () => {
      it("returns not found error exception", async () => {
        const args = { contractsRepository: fakeContractRepo };
        const acceptContract = new AcceptContract(args);

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id 4 can't be found.`;
        await expect(
          () => acceptContract.execute(4, pilots[0])
        ).rejects.toThrow(notFoundError);
      });
    });

    describe("When it doesnt find pilot with a given pilot certification", () => {
      it("returns not found error exception", async () => {
        const args = {
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
        };
        const acceptContract = new AcceptContract(args);
        let fakePilot = dataFactory.create("Pilot", {
          id: 6,
          pilotCertification: 1234555,
          name: "Matheus",
          age: 22,
          credits: 0,
          locationPlanet: "Aqua",
        });
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Pilot with pilotCertification ${fakePilot.pilotCertification} can't be found.`;
        await expect(
          () => acceptContract.execute(3, fakePilot)
        ).rejects.toThrow(notFoundError);
      });
    });

    describe("When location planet of pilot isn't the same as the origin planet of contract", () => {
      it("returns validation error exception", async () => {
        const args = {
          cargosRepository: fakeCargoRepo,
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
          resourcesRepository: fakeResourceRepo,
        };
        const acceptContract = new AcceptContract(args);

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Contract 3 isn't available or pilot isn't in the origin planet of contract.`;
        await expect(
          () =>  acceptContract.execute(3, pilots[0])
        ).rejects.toThrow(validationError);
      });
    });

    describe("When contract doesn't have status equals CREATED", () => {
      it("returns validation error exception", async () => {
        const args = {
          cargosRepository: fakeCargoRepo,
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
          resourcesRepository: fakeResourceRepo,
        };
        const acceptContract = new AcceptContract(args);
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Contract 3 isn't available or pilot isn't in the origin planet of contract.`;
        await expect(
          () => acceptContract.execute(2, pilots[0])
        ).rejects.toThrow(validationError);
      });
    });

    describe("When it doesnt find ship with a given pilot certification", () => {
      it("returns not found error exception", async () => {
        const args = {
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
        };
        const acceptContract = new AcceptContract(args);

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Ship with pilotCertification 1234577 can't be found.`;
        await expect(
           () => acceptContract.execute(3, pilots[2])
        ).rejects.toThrow(notFoundError);
      });
    });

    describe("When ship can't carry the required weight of contract", () => {
      it("returns validation error exception", async () => {
        const args = {
          cargosRepository: fakeCargoRepo,
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
          resourcesRepository: fakeResourceRepo,
        };
        const acceptContract = new AcceptContract(args);

        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `The ship can't carry the required weight of contract`;
        await expect(
          () => acceptContract.execute(5, pilots[3])
        ).rejects.toThrow(validationError);
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract has a non-existent cargo id", () => {
        it("returns not found error", async () => {
          const args = {
            cargosRepository: fakeCargoRepo,
            contractsRepository: fakeContractRepo,
            pilotsRepository: fakePilotRepo,
            shipsRepository: fakeShipRepo,
            resourcesRepository: fakeResourceRepo,
          };
          const acceptContract = new AcceptContract(args);

          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Cargo with id 100 can't be found.`;

          
          await expect(() =>
            acceptContract.execute(1, pilots[4])
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract with cargo that has a non-existent resource id", () => {
        it("returns not found error", async () => {
          const args = {
            cargosRepository: fakeCargoRepo,
            contractsRepository: fakeContractRepo,
            pilotsRepository: fakePilotRepo,
            shipsRepository: fakeShipRepo,
            resourcesRepository: fakeResourceRepo,
          };
          const acceptContract = new AcceptContract(args);

          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Resource with id 100 can't be found.`;

          await expect(() =>
            acceptContract.execute(1, pilots[5])
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating a contract with non-existent cargo id ", () => {
      it("returns not found error", async () => {
        const args = {
          cargosRepository: fakeCargoRepo,
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
          resourcesRepository: fakeResourceRepo,
        };
        const acceptContract = new AcceptContract(args);

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Cargo with id 100 can't be found.`;

        await expect(() =>
            acceptContract.execute(16, pilots[3])
          ).rejects.toThrow(notFoundError);
      });
    });

    describe("when calculating a contract with cargo that has a non-existent resource id ", () => {
      it("returns not found error", async () => {

        const args = {
          cargosRepository: fakeCargoRepo,
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
          resourcesRepository: fakeResourceRepo,
        };
        const acceptContract = new AcceptContract(args);

        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id 100 can't be found.`;

        await expect(() =>
            acceptContract.execute(17, pilots[3])
          ).rejects.toThrow(notFoundError);
      });
    });

    describe("When a pilot accept a new contract", () => {
      it("returns the correct result", async () => {
        const args = {
          cargosRepository: fakeCargoRepo,
          contractsRepository: fakeContractRepo,
          pilotsRepository: fakePilotRepo,
          shipsRepository: fakeShipRepo,
          resourcesRepository: fakeResourceRepo,
        };
        const acceptContract = new AcceptContract(args);
        expect(await acceptContract.execute(1, pilots[0])).toEqual({
          id: 1,
          pilotCertification: 1234567,
          cargoId: 1,
          description: "water, food and minerals to Demeter.",
          originPlanet: "Aqua",
          destinationPlanet: "Demeter",
          contractStatus: "IN PROGRESS",
          value: 4000,
        });
      });
    });
  });
});
