const GetPilotsReport = require("../../../../src/app/use_cases/reports/GetPilotsReport");
const { FakeRepositoriesFactory } = require("../../../support/factories/repository/FakeRepositoriesFactory.js");
const { DataFactory } = require("../../../support/factories/data");

const dataFactory = new DataFactory();
let cargos = [
  dataFactory.create("Cargo", { id: 1, resourceIds: [1, 2, 3] }),
  dataFactory.create("Cargo", { id: 2, resourceIds: [2] }),
  dataFactory.create("Cargo", { id: 3, resourceIds: [3] }),
  dataFactory.create("Cargo", { id: 4, resourceIds: [4] }),
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
];

const factory = new FakeRepositoriesFactory();
let fakeCargoRepo = factory.create("Cargos", cargos);
let fakeContractRepo = factory.create("Contracts", contracts);
let fakePilotRepo = factory.create("Pilots", pilots);
let fakeResourceRepo = factory.create("Resources", resources);

describe("App :: UseCases :: GetPilotsReport", () => {
  describe("#execute", () => {
    describe("when it gets pilots report", () => {
      it("returns the correct report", async () => {
        const getPilotsReport = new GetPilotsReport(fakeCargoRepo, fakeContractRepo, fakePilotRepo, fakeResourceRepo);
        const answer = [
          {
            id: 1,
            pilotCertification: 1234567,
            transporting: {
              water: 0,
              food: 100,
              minerals: 0,
            },
          },
          {
            id: 2,
            pilotCertification: 1234566,
            transporting: {
              water: 0,
              food: 0,
              minerals: 0,
            },
          },
          {
            id: 3,
            pilotCertification: 1234577,
            transporting: {
              water: 0,
              food: 0,
              minerals: 0,
            },
          },
          {
            id: 4,
            pilotCertification: 1234588,
            transporting: {
              water: 0,
              food: 0,
              minerals: 0,
            },
          },
        ];
        expect(await getPilotsReport.execute()).toEqual(answer);
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract has a non-existent cargo id", () => {
        it("returns not found error", async () => {
          let resources = [
            dataFactory.create("Resource", { id: 1, name: "water", weight: 100 }),
          ];
          let cargos = [
            dataFactory.create("Cargo", { id: 10, resourceIds: [100] }),
          ];
          let contracts = [
            dataFactory.create("Contract", {
              id: 10,
              pilotCertification: 1234599,
              cargoId: 100,
              description: "food to Calas.",
              originPlanet: "Demeter",
              destinationPlanet: "Calas",
              value: 4000,
              contractStatus: "IN PROGRESS",
            }),
          ];
          let pilots = [
            dataFactory.create("Pilot", {
              id: 10,
              pilotCertification: 1234599,
              name: "Jerry",
              age: 30,
              credits: 2000,
              locationPlanet: "Demeter",
            })
          ];
          let fakeCargoRepo2 = factory.create("Cargos", cargos);
          let fakeContractRepo2 = factory.create("Contracts", contracts);
          let fakePilotRepo2 = factory.create("Pilots", pilots);
          let fakeResourceRepo2 = factory.create("Resources", resources);
          const getPilotsReport = new GetPilotsReport(fakeCargoRepo2, fakeContractRepo2, fakePilotRepo2, fakeResourceRepo2);
          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Cargo with id 100 can't be found.`;

          await expect(() =>
            getPilotsReport.execute()
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when calculating the total resources that a pilot has", () => {
      describe("and his contract with cargo that has a non-existent resource id", () => {
        it("returns not found error", async () => {
          let resources = [
            dataFactory.create("Resource", { id: 1, name: "water", weight: 100 }),
          ];
          let cargos = [
            dataFactory.create("Cargo", { id: 10, resourceIds: [100] }),
          ];
          let contracts = [
            dataFactory.create("Contract", {
              id: 10,
              pilotCertification: 1234599,
              cargoId: 10,
              description: "food to Calas.",
              originPlanet: "Demeter",
              destinationPlanet: "Calas",
              value: 4000,
              contractStatus: "IN PROGRESS",
            }),
          ];
          let pilots = [
            dataFactory.create("Pilot", {
              id: 10,
              pilotCertification: 1234599,
              name: "Jerry",
              age: 30,
              credits: 2000,
              locationPlanet: "Demeter",
            })
          ];
          let fakeCargoRepo3 = factory.create("Cargos", cargos);
          let fakeContractRepo3 = factory.create("Contracts", contracts);
          let fakePilotRepo3 = factory.create("Pilots", pilots);
          let fakeResourceRepo3 = factory.create("Resources", resources);
          const getPilotsReport = new GetPilotsReport(fakeCargoRepo3, fakeContractRepo3, fakePilotRepo3, fakeResourceRepo3);

          const notFoundError = new Error("Not Found Error");
          notFoundError.CODE = "NOTFOUND_ERROR";
          notFoundError.message = `Resource with id 100 can't be found.`;

          await expect(() =>
            getPilotsReport.execute()
          ).rejects.toThrow(notFoundError);
        });
      });
    });

    describe("when doesn't have any pilots", () => {
      it("returns empty array", async () => {
        let fakePilotRepo2 = factory.create("Pilots", []);
        const getPilotsReport = new GetPilotsReport(fakeCargoRepo, fakeContractRepo, fakePilotRepo2, fakeResourceRepo);
        const answer = [];
        expect(await getPilotsReport.execute()).toEqual(answer);
      });
    });
  });
});
