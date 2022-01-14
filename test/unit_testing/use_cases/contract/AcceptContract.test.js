const AcceptContract = require("../../../../src/app/use_cases/contract/AcceptContract");
const { fakeCargoRepository, fakeResourceRepository, fakeContractRepository, fakePilotRepository, fakeShipRepository } = require("../../../support/factories");
const Cargo = require("../../../../src/domain/entities/Cargo");
const Contract = require("../../../../src/domain/entities/Contract");
const Resource = require("../../../../src/domain/entities/Resource");
const Pilot = require("../../../../src/domain/entities/Pilot");
const Ship = require("../../../../src/domain/entities/Ship");
describe("AcceptContract Tests", () => {
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
  ];
  let pilots = [
    new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 0, locationPlanet: "Aqua"}),
    new Pilot({ id: 2, pilotCertification: 1234566, name: "Peter", age: 20, credits: 5000, locationPlanet: "Aqua"}),
  ];
  let ships = [
    new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000}),
    new Ship({ id: 2, pilotCertification: 1234566, fuelCapacity: 1500, fuelLevel: 500, weightCapacity: 1000}),
  ];

  let fakeCargoRepo = new fakeCargoRepository(cargos);
  let fakeContractRepo = new fakeContractRepository(contracts);
  let fakePilotRepo = new fakePilotRepository(pilots);
  let fakeShipRepo = new fakeShipRepository(ships);
  let fakeResourceRepo = new fakeResourceRepository(resources);
  const acceptContract = new AcceptContract(fakeCargoRepo, fakeContractRepo, fakePilotRepo, fakeShipRepo, fakeResourceRepo);
  
  describe("_isPossibleToShipCarry", () => {
    describe("If actual ship weight and total contract weight is smaller than ship weight capacity", () => {
      it("returns true", () => {
        expect(acceptContract._isPossibleToShipCarry(400, 200, 100)).toEqual(true);
      });
    });

    describe("If actual ship weight and total contract weight is equal than ship weight capacity", () => {
      it("returns true", () => {
        expect(acceptContract._isPossibleToShipCarry(400, 200, 200)).toEqual(true);
      });
    });

    describe("If actual ship weight and total contract weight is greater than ship weight capacity", () => {
      it("returns false", () => {
        expect(acceptContract._isPossibleToShipCarry(400, 300, 200)).toEqual(false);
      });
    });
  });

  describe("execute", () => {
    describe("When location planet of pilot isn't the same as the origin planet of contract", () => {
      it("returns validation error exception", async () => {
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Contract 3 isn't available or pilot isn't in the origin planet of contract.`;
        expect(async () => await acceptContract.execute(3, pilots[0])).rejects.toThrow(validationError);
      });
    });

    describe("When contract doesn't have status equals CREATED", () => {
      it("returns validation error exception", async () => {
        const validationError = new Error("Validation Error");
        validationError.CODE = "VALIDATION_ERROR";
        validationError.errors = `Contract 3 isn't available or pilot isn't in the origin planet of contract.`;
        expect(async () => await acceptContract.execute(2, pilots[0])).rejects.toThrow(validationError);
      });
    });
  });
});
