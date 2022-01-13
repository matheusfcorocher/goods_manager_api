const {
  isPossibleToShipCarry,
  WeightPilotIsCarrying,
} = require("../../core_rules/ship/rules");
const { travelFuelCost } = require("../../core_rules/travel/rules");
const {
  makeGetCargoWeight,
  makeGetCargoWeightContract,
  makeGetCargoWeightPilot,
  makeGetAllResourcesCargo,
  makeGetAllResourcesContract,
  makeGetAllResourcesPilot,
} = require("../../src/app/cargo");
const { getRefillShip } = require("../../src/app/ship");
const Cargo = require("../../src/domain/entities/Cargo");
const Contract = require("../../src/domain/entities/Contract");
const Pilot = require("../../src/domain/entities/Pilot");
const Resource = require("../../src/domain/entities/Resource");
const Ship = require("../../src/domain/entities/Ship");
const {
  fakeCargoRepository,
  fakeResourceRepository,
  fakeContractRepository,
} = require("../support/factories/cargo");

describe("Resources Tests ", () => {
  describe("verifyName", () => {
    let resource = new Resource({ id: 1, name: "water", weight: 100 });
    describe("if resource name is water", () => {
      it("returns true", () => {
        expect(resource.verifyName()).toEqual(true);
      });
    });
    describe("if resource name is food", () => {
      it("returns true", () => {
        resource.setName("food");
        expect(resource.verifyName()).toEqual(true);
      });
    });

    describe("if resource name is minerals", () => {
      it("returns true", () => {
        resource.setName("minerals");
        expect(resource.verifyName()).toEqual(true);
      });
    });

    describe(`if resource name isnt 'minerals' or 'food' or 'water'`, () => {
      it("returns false", () => {
        resource.setName("salmon");
        expect(resource.verifyName()).toEqual(false);
      });
    });
  });
});

describe("Cargos Tests ", () => {
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

  describe("getCargoWeight", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        const getCargoWeight = makeGetCargoWeight(
          fakeCargoRepo,
          fakeResourceRepo
        );
        expect(await getCargoWeight(1)).toEqual(1400);
      });
    });
  });

  describe("getCargoAllResources", () => {
    describe("when calculating the total resources cargo has", () => {
      it("returns correctly all resources", async () => {
        const getAllResourcesCargo = makeGetAllResourcesCargo(
          fakeCargoRepo,
          fakeResourceRepo
        );
        const result = {
          water: 100,
          food: 300,
          minerals: 1000,
        };
        expect(await getAllResourcesCargo(1)).toEqual(result);
      });
    });
  });

  describe("getCargoWeightContract", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        const getCargoWeightContract = await makeGetCargoWeightContract(
          fakeCargoRepo,
          fakeContractRepo,
          fakeResourceRepo
        );
        expect(await getCargoWeightContract(2)).toEqual(300);
      });
    });
  });

  describe("getAllResourcesContract", () => {
    describe("when calculating the total resources contract has", () => {
      it("returns correctly all resources", async () => {
        const getAllResourcesContract = makeGetAllResourcesContract(
          fakeCargoRepo,
          fakeContractRepo,
          fakeResourceRepo
        );
        const result = {
          water: 100,
          food: 300,
          minerals: 1000,
        };
        expect(await getAllResourcesContract(1)).toEqual(result);
      });
    });
  });

  describe("getCargoWeightPilot", () => {
    describe("when calculating the weight", () => {
      it("returns the correct weight", async () => {
        const getCargoWeightPilot = await makeGetCargoWeightPilot(
          fakeCargoRepo,
          fakeContractRepo,
          fakeResourceRepo
        );
        expect(await getCargoWeightPilot(contracts[2].pilotCertification)).toEqual(1000);
      });
    });
  });

  describe("getAllResourcesPilot", () => {
    describe("when calculating the total resources contract has", () => {
      it("returns correctly all resources", async () => {
        const getAllResourcesPilot = await makeGetAllResourcesPilot(
          fakeCargoRepo,
          fakeContractRepo,
          fakeResourceRepo
        );
        const result = {
          water: 100,
          food: 600,
          minerals: 1000,
        };
        expect(await getAllResourcesPilot(contracts[1].pilotCertification)).toEqual(result);
      });
    });
  });
});

describe("Ship Tests", () => {
  describe("isPossibleToShipCarry", () => {
    describe("If actual ship weight and total contract weight is smaller than ship weight capacity", () => {
      it("returns true", () => {
        expect(isPossibleToShipCarry(400, 200, 100)).toEqual(true);
      });
    });

    describe("If actual ship weight and total contract weight is equal than ship weight capacity", () => {
      it("returns true", () => {
        expect(isPossibleToShipCarry(400, 200, 200)).toEqual(true);
      });
    });

    describe("If actual ship weight and total contract weight is greater than ship weight capacity", () => {
      it("returns false", () => {
        expect(isPossibleToShipCarry(400, 300, 200)).toEqual(false);
      });
    });
  });

  describe("getRefillShip", () => {
    describe("when pilot has 0 credits to pay the entire fulfillment of ship", () => {
      let pilot0 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 0, locationPlanet: "Aqua"})
      let ship0 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000})
      it("returns 0 credits and the the same fuel level", () => {
        expect(getRefillShip(pilot0, ship0)).toEqual({credits: 0, fuelLevel: 25});
      });
    });

    describe("when pilot has less credits to pay the entire fulfillment of ship", () => {
      let pilot1 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 5000, locationPlanet: "Aqua"})
      let ship1 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000})
      it("returns 0 credits and the corresponding credits for fuel level", () => {
        expect(getRefillShip(pilot1, ship1)).toEqual({credits: 0, fuelLevel: 739});
      });
    });

    describe("when pilot has more credits to pay the entire fulfillment of ship", () => {
      let pilot2 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 15000, locationPlanet: "Aqua"})
      let ship2 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 25, weightCapacity: 1000})
      it("returns corresponding credits and fuel level corresponding fuelCapacity of ship", () => {
        expect(getRefillShip(pilot2, ship2)).toEqual({credits: 4676, fuelLevel: 1500});
      });
    });

    describe("when calculating the refill of ship and his fuelCapacity is already full", () => {
      let pilot3 = new Pilot({ id: 1, pilotCertification: 1234567, name: "Matheus", age: 22, credits: 1000, locationPlanet: "Aqua"})
      let ship3 = new Ship({ id: 1, pilotCertification: 1234567, fuelCapacity: 1500, fuelLevel: 1500, weightCapacity: 1000})
      it("returns the same initial credits and fuelLevel", () => {
        expect(getRefillShip(pilot3, ship3)).toEqual({credits: 1000, fuelLevel: 1500});
      });
    });
  });

  // describe("WeightPilotIsCarrying", () => {
  //   let pilots = [
  //     {
  //       id: 1,
  //       pilotCertification: 1234567,
  //       name: "Matheus",
  //       age: 22,
  //       credits: 5000,
  //       locationPlanet: "Aqua",
  //       createdAt: new Date().toJSON(),
  //       updatedAt: new Date().toJSON(),
  //       Contracts: {
  //         id: 1,
  //         description: "water, food and minerals to Demeter.",
  //         pilotCertification: 1234567,
  //         cargoId: 1,
  //         originPlanet: "Aqua",
  //         destinationPlanet: "Demeter",
  //         value: 4000,
  //         contractStatus: "IN PROGRESS",
  //         createdAt: new Date().toJSON(),
  //         updatedAt: new Date().toJSON(),
  //         Cargo: {
  //           id: 1,
  //           cargoId: 1,
  //           resourceId: 1,
  //           createdAt: new Date().toJSON(),
  //           updatedAt: new Date().toJSON(),
  //           Resource: {
  //             id: 1,
  //             name: "water",
  //             weight: 100,
  //             createdAt: new Date().toJSON(),
  //             updatedAt: new Date().toJSON(),
  //           },
  //         },
  //       },
  //     },
  //     {
  //       id: 1,
  //       pilotCertification: 1234567,
  //       name: "Matheus",
  //       age: 22,
  //       credits: 5000,
  //       locationPlanet: "Aqua",
  //       createdAt: new Date().toJSON(),
  //       updatedAt: new Date().toJSON(),
  //       Contracts: {
  //         id: 1,
  //         description: "water, food and minerals to Demeter.",
  //         pilotCertification: 1234567,
  //         cargoId: 1,
  //         originPlanet: "Aqua",
  //         destinationPlanet: "Demeter",
  //         value: 4000,
  //         contractStatus: "IN PROGRESS",
  //         createdAt: new Date().toJSON(),
  //         updatedAt: new Date().toJSON(),
  //         Cargo: {
  //           id: 2,
  //           cargoId: 1,
  //           resourceId: 3,
  //           createdAt: new Date().toJSON(),
  //           updatedAt: new Date().toJSON(),
  //           Resource: {
  //             id: 3,
  //             name: "minerals",
  //             weight: 300,
  //             createdAt: new Date().toJSON(),
  //             updatedAt: new Date().toJSON(),
  //           },
  //         },
  //       },
  //     },
  //     {
  //       id: 1,
  //       pilotCertification: 1234567,
  //       name: "Matheus",
  //       age: 22,
  //       credits: 5000,
  //       locationPlanet: "Aqua",
  //       createdAt: new Date().toJSON(),
  //       updatedAt: new Date().toJSON(),
  //       Contracts: {
  //         id: 1,
  //         description: "water, food and minerals to Demeter.",
  //         pilotCertification: 1234567,
  //         cargoId: 1,
  //         originPlanet: "Aqua",
  //         destinationPlanet: "Demeter",
  //         value: 4000,
  //         contractStatus: "IN PROGRESS",
  //         createdAt: new Date().toJSON(),
  //         updatedAt: new Date().toJSON(),
  //         Cargo: {
  //           id: 3,
  //           cargoId: 1,
  //           resourceId: 4,
  //           createdAt: new Date().toJSON(),
  //           updatedAt: new Date().toJSON(),
  //           Resource: {
  //             id: 4,
  //             name: "food",
  //             weight: 1000,
  //             createdAt: new Date().toJSON(),
  //             updatedAt: new Date().toJSON(),
  //           },
  //         },
  //       },
  //     },
  //   ];

  //   describe("If ship has already have a cargo", () => {
  //     it("returns true", async () => {
  //       expect(await WeightPilotIsCarrying(1, pilots)).toEqual(1400);
  //     });
  //   });

  //   describe("If ship doesn't have any cargo", () => {
  //     it("returns true", async () => {
  //       expect(await WeightPilotIsCarrying(2, pilots)).toEqual(0);
  //     });
  //   });

  //   describe("If nobody has any cargo", () => {
  //     it("returns true", async () => {
  //       expect(await WeightPilotIsCarrying(1, [])).toEqual(0);
  //     });
  //   });
  // });
});

describe("Travel Tests", () => {
  describe("travelFuelCost", () => {
    describe("If origin planet is Andvari", () => {
      it("returns 0 when destination planet is Andvari", () => {
        expect(travelFuelCost("Andvari", "Andvari")).toEqual(0);
      });
      it("returns 43 when destination planet is Demeter", () => {
        expect(travelFuelCost("Andvari", "Demeter")).toEqual(43);
      });
      it("returns 13 when destination planet is Aqua", () => {
        expect(travelFuelCost("Andvari", "Aqua")).toEqual(13);
      });
      it("returns 23 when destination planet is Calas", () => {
        expect(travelFuelCost("Andvari", "Calas")).toEqual(23);
      });
    });

    describe("If origin planet is Demeter", () => {
      it("returns 45 when destination planet is Andvari", () => {
        expect(travelFuelCost("Demeter", "Andvari")).toEqual(45);
      });
      it("returns 0 when destination planet is Demeter", () => {
        expect(travelFuelCost("Demeter", "Demeter")).toEqual(0);
      });
      it("returns 22 when destination planet is Aqua", () => {
        expect(travelFuelCost("Demeter", "Aqua")).toEqual(22);
      });
      it("returns 25 when destination planet is Calas", () => {
        expect(travelFuelCost("Demeter", "Calas")).toEqual(25);
      });
    });

    describe("If origin planet is Aqua", () => {
      it("returns 32 when destination planet is Andvari", () => {
        expect(travelFuelCost("Aqua", "Andvari")).toEqual(32);
      });
      it("returns 30 when destination planet is Demeter", () => {
        expect(travelFuelCost("Aqua", "Demeter")).toEqual(30);
      });
      it("returns 0 when destination planet is Aqua", () => {
        expect(travelFuelCost("Aqua", "Aqua")).toEqual(0);
      });
      it("returns 12 when destination planet is Calas", () => {
        expect(travelFuelCost("Aqua", "Calas")).toEqual(12);
      });
    });

    describe("If origin planet is Calas", () => {
      it("returns 20 when destination planet is Andvari", () => {
        expect(travelFuelCost("Calas", "Andvari")).toEqual(20);
      });
      it("returns 25 when destination planet is Demeter", () => {
        expect(travelFuelCost("Calas", "Demeter")).toEqual(25);
      });
      it("returns 15 when destination planet is Aqua", () => {
        expect(travelFuelCost("Calas", "Aqua")).toEqual(15);
      });
      it("returns 0 when destination planet is Calas", () => {
        expect(travelFuelCost("Calas", "Calas")).toEqual(0);
      });
    });
  });
});
