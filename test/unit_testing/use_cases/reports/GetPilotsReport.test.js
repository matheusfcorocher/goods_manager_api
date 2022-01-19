const GetPilotsReport = require("../../../../src/app/use_cases/reports/GetPilotsReport");
const Cargo = require("../../../../src/domain/entities/Cargo");
const Contract = require("../../../../src/domain/entities/Contract");
const Pilot = require("../../../../src/domain/entities/Pilot");
const Resource = require("../../../../src/domain/entities/Resource");
const { FakeRepositoriesFactory } = require("../../../support/factories");

let cargos = [
  new Cargo({ id: 1, resourceIds: [1, 2, 3] }),
  new Cargo({ id: 2, resourceIds: [2] }),
  new Cargo({ id: 3, resourceIds: [3] }),
  new Cargo({ id: 4, resourceIds: [4] }),
];

let resources = [
  new Resource({ id: 1, name: "water", weight: 100 }),
  new Resource({ id: 2, name: "food", weight: 300 }),
  new Resource({ id: 3, name: "minerals", weight: 1000 }),
  new Resource({ id: 4, name: "food", weight: 2000 }),
];

let contracts = [
  new Contract({
    id: 1,
    pilotCertification: null,
    cargoId: 1,
    description: "water, food and minerals to Demeter.",
    originPlanet: "Aqua",
    destinationPlanet: "Demeter",
    value: 4000,
    contractStatus: "CREATED",
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
    description: "minerals to Demeter.",
    originPlanet: "Calas",
    destinationPlanet: "Demeter",
    value: 1000,
    contractStatus: "CREATED",
  }),
  new Contract({
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
  new Pilot({
    id: 1,
    pilotCertification: 1234567,
    name: "Matheus",
    age: 22,
    credits: 0,
    locationPlanet: "Aqua",
  }),
  new Pilot({
    id: 2,
    pilotCertification: 1234566,
    name: "Peter",
    age: 20,
    credits: 5000,
    locationPlanet: "Aqua",
  }),
  new Pilot({
    id: 3,
    pilotCertification: 1234577,
    name: "Tom",
    age: 24,
    credits: 2000,
    locationPlanet: "Calas",
  }),
  new Pilot({
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

describe("GetPilotsReport Tests", () => {
  describe("execute", () => {
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
