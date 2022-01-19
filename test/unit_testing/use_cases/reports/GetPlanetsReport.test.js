const GetPlanetsReport = require("../../../../src/app/use_cases/reports/GetPlanetsReport");
const Cargo = require("../../../../src/domain/entities/Cargo");
const Contract = require("../../../../src/domain/entities/Contract");
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
    contractStatus: "FINISHED",
  }),
  new Contract({
    id: 5,
    pilotCertification: 1234567,
    cargoId: 4,
    description: "food to Calas.",
    originPlanet: "Demeter",
    destinationPlanet: "Calas",
    value: 4000,
    contractStatus: "IN PROGRESS",
  }),
];

const factory = new FakeRepositoriesFactory();
let fakeCargoRepo = factory.create("Cargos", cargos);
let fakeContractRepo = factory.create("Contracts", contracts);
let fakeResourceRepo = factory.create("Resources", resources);
describe("GetPlanetsReport Tests", () => {
  
  describe("execute", () => {
    describe("when getting planets report", () => {
      it("returns the correct report", async () => {
        const getPlanetsReport = new GetPlanetsReport(fakeCargoRepo, fakeContractRepo, fakeResourceRepo);
        const answer = {
          Andvari: {
            sent: {
              water: 0,
              food: 0,
              minerals: 0,
            },
            received: {
              water: 0,
              food: 0,
              minerals: 0,
            }
          },
          Aqua: {
            sent: {
              water: 0,
              food: 300,
              minerals: 0,
            },
            received: {
              water: 0,
              food: 0,
              minerals: 0,
            }
          },
          Calas: {
            sent: {
              water: 0,
              food: 0,
              minerals: 1000,
            },
            received: {
              water: 0,
              food: 0,
              minerals: 0,
            }
          },
          Demeter: {
            sent: {
              water: 0,
              food: 2000,
              minerals: 0,
            },
            received: {
              water: 0,
              food: 0,
              minerals: 1000,
            }
          },
        };
        expect(await getPlanetsReport.execute()).toEqual(answer);
      });
    });
  });

  describe("execute", () => {
    describe("when doesn't have any contracts", () => {
      it("returns the correct report", async () => {
        let fakeContractRepo2 = factory.create("Contracts", [])
        const getPlanetsReport = new GetPlanetsReport(fakeCargoRepo, fakeContractRepo2, fakeResourceRepo);
        const resources = {sent: {
          water: 0,
          food: 0,
          minerals: 0,
        },
        received: {
          water: 0,
          food: 0,
          minerals: 0,
        }};
        const answer = {
          Andvari: resources,
          Aqua: resources,
          Calas: resources,
          Demeter: resources,
        };
        expect(await getPlanetsReport.execute()).toEqual(answer);
      });
    });
  });
});
