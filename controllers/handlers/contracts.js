const { travelFuelCost } = require("../../core_rules/travel/rules.js");
const { WeightContract } = require("../../core_rules/resources/rules.js");
const { WeightPilotIsCarrying, isPossibleToShipCarry} = require("../../core_rules/ship/rules.js");
const { Sequelize } = require("../../models/index.js");
const models = require("../../models/index.js");
const { Contracts, Pilots, Ships, Transactions } = models;

const getAllContractsHandler = async (req, reply) => {
  const { contractStatus } = req.query;

  let contracts = await Contracts.findAll({
    raw: true,
  });

  if (contractStatus)
    contracts = contracts.filter((c) => c.contractStatus === contractStatus);
  reply.send(contracts);
};

const getContractHandler = async (req, reply) => {
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found",
    });
  }

  reply.send(contract[0]);
};

const postContractHandler = async (req, reply) => {
  const {
    pilotCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  } = req.body;

  if (contractStatus) contractStatus = "CREATED";

  await Contracts.create({
    pilotCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  });

  reply.send("Contract added!");
};

const postContractsHandler = async (req, reply) => {
  const {
    pilotCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  } = req.body;

  if (contractStatus) contractStatus = "CREATED";

  await Contracts.create({
    pilotCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  });

  reply.send("Contract added!");
};

const updateContractHandler = async (req, reply) => {
  const {
    pilotCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  } = req.body;
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found!",
    });
  }

  await Contracts.update(
    {
      pilotCertification,
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus,
    },
    {
      where: {
        id,
      },
    }
  );

  reply.send("Contract updated!");
};
const acceptContractHandler = async (req, reply) => {
  const { pilotCertification } = req.body;
  const { id } = req.params;

  const contract = await Contracts.findAll({
    raw: true,
    where: {
      id,
    },
  });

  const pilot = await Pilots.findAll({
    where: {
      pilotCertification
    },
    include: [
      {
        model: Ships,
      },
    ],
    raw: true,
    nest: true,
  }).catch(console.error);

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found!",
    });
  }

  if (Object.keys(pilot).length === 0) {
    return reply.status(404).send({
      errorMsg: "Pilot not found!",
    });
  }

  if (contract[0].contractStatus === "CREATED") {
    //must be in the planet
    if (pilot[0].locationPlanet == contract[0].originPlanet) {
      
      //bring actual ship's weight
      const actualShipWeight = await WeightPilotIsCarrying(pilot[0].id);
      //bring contract's weight
      const contractWeight = await WeightContract(contract[0].id);
        
      console.log(pilot[0].Ship.weightCapacity)
      console.log(actualShipWeight)
      console.log(contractWeight)
      if(isPossibleToShipCarry(pilot[0].Ship.weightCapacity, actualShipWeight, contractWeight)) {
        const contractStatus = "IN PROGRESS";
        await Contracts.update(
          {
            pilotCertification,
            contractStatus,
          },
          {
            where: {
              id,
            },
          }
        );
        reply.send("Contract was accepted!");
      }
      else {
        return reply.status(404).send({
          errorMsg: "Weight capacity isnt enough for this contract!",
        });
      }
    }
    else {
      return reply.status(404).send({
        errorMsg: "Pilot need to be in the origin planet to accept this contract!",
      });
    }
  } else
    return reply.status(404).send({
      errorMsg: "Contract was finished or is in progress with another pilot!",
    });
};

const fulfillContractHandler = async (req, reply) => {
  const { id } = req.params;

  const contract = await Contracts.findAll({
    raw: true,
    where: {
      id,
    },
  });

  const pilot = await Pilots.findAll({
    where: {
      pilotCertification: contract[0].pilotCertification,
    },
    include: [
      {
        model: Ships,
      },
    ],
    raw: true,
    nest: true,
  }).catch(console.error);

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found!",
    });
  }

  if (Object.keys(pilot).length === 0) {
    return reply.status(404).send({
      errorMsg: "Pilot not found!",
    });
  }

  if (
    contract[0].contractStatus == "IN PROGRESS" &&
    pilot[0].pilotCertification == contract[0].pilotCertification
  ) {
    const contractStatus = "FINISHED";

    let { credits, locationPlanet, Ship } = pilot[0];
    let { fuelLevel } = Ship;
    fuelLevel -= travelFuelCost(locationPlanet, contract[0].destinationPlanet);
    if (fuelLevel < 0)
      return reply.status(404).send({
        errorMsg:
          "The fuel level of ship isnt enough to arrive in the destination planet.",
      });

    credits += contract[0].value;

    await Pilots.update(
      {
        credits,
        locationPlanet: contract[0].destinationPlanet,
      },
      {
        where: {
          pilotCertification: contract[0].pilotCertification,
        },
      }
    );

    await Ships.update(
      {
        fuelLevel,
      },
      {
        where: {
          pilotCertification: contract[0].pilotCertification,
        },
      }
    );

    await Contracts.update(
      {
        contractStatus,
      },
      {
        where: {
          id,
        },
      }
    );

    const about = `Contract ${contract[0].id} Description paid: -₭${contract[0].value}`;
    await Transactions.create({ about });

    reply.send("Contract was fullfilled!");
  } else
    return reply.status(404).send({
      errorMsg: "Contract is not in progress or doesn't belong to right pilot!",
    });
};

const deleteContractHandler = async (req, reply) => {
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send(new Error("Contract not found"));
  }

  await Contracts.destroy({
    where: {
      id,
    },
  });

  return reply.send("Contract deleted!");
};

module.exports = {
  acceptContractHandler,
  getAllContractsHandler,
  getContractHandler,
  postContractHandler,
  postContractsHandler,
  updateContractHandler,
  deleteContractHandler,
  fulfillContractHandler,
};
