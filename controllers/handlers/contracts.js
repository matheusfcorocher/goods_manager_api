const { travelFuelCost } = require("../../core_rules/travel/rules.js");
const { Sequelize } = require("../../models/index.js");
const models = require("../../models/index.js");
const { Contracts, Pilots, Ships } = models;

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
  // const contract = contracts.filter((contract) => {
  //   return contract.contract_certification === contract_certification;
  // })[0];

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

  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found!",
    });
  }

  //must be in the planet

  //verify weight of ship
  
  if (contract[0].contractStatus === "CREATED") {
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


  if (Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: "Contract not found!",
    });
  }

  if (contract[0].contractStatus == "IN PROGRESS") {
    const contractStatus = "FINISHED";
    const pilot = await Pilots.findAll({
      where: {
        pilotCertification: contract[0].pilotCertification
      },
      include: [
        {
          model: Ships,
        },
      ],
      raw:true,
      nest: true
    })
    .catch(console.error);
    
    let { credits , locationPlanet, Ship} = pilot[0];
    let {fuelCapacity} = Ship;
    fuelCapacity -= travelFuelCost(locationPlanet, contract[0].destinationPlanet)
    credits += contract[0].value
    
    await Pilots.update(
      {
        credits,
        locationPlanet: contract[0].destinationPlanet,
      },
      {
        where: {
          pilotCertification: contract[0].pilotCertification
        },
      }
    );

    await Ships.update(
      {
        fuelCapacity
      },
      {
        where: {
          pilotCertification: contract[0].pilotCertification
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
    reply.send("Contract was fullfilled!");
  } else
    return reply.status(404).send({
      errorMsg: "Contract is not in progress!",
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
