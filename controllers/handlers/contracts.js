const models = require("../../models/index.js");
const Contracts = models.Contracts;

const getAllContractsHandler = async (req, reply) => {
    const contracts = await Contracts.findAll(); 
    reply.send(contracts);
}

const getContractHandler = async (req, reply) => {
  const { id } = req.params;
  
  const contract = await Contracts.findAll({
    where: {
      id
    }
  });
  // const contract = contracts.filter((contract) => {
  //   return contract.contract_certification === contract_certification;
  // })[0];

  if(Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: 'Contract not found',
    });
  }

  reply.send(contract[0]);
}

const postContractHandler = async (req, reply) => {
  const { pilotCertification, cargoId, description, originPlanet, destinationPlanet,
    value,
    contractStatus
  } = req.body;
  
  if(contractStatus)
    contractStatus = "CREATED" 

  await Contracts.create({ pilotCertification, cargoId, description, originPlanet, destinationPlanet,
    value,
    contractStatus});

  reply.send('Contract added!');
};

const updateContractHandler = async (req, reply) => {
  const { pilotCertification, cargoId, description, originPlanet, destinationPlanet,
    value,
    contractStatus } = req.body; 
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id
    }
  });

  if(Object.keys(contract).length === 0) {
    return reply.status(404).send({
      errorMsg: 'Contract not found!',
    });
  }

  await Contracts.update(
    { pilotCertification, cargoId, description, originPlanet, destinationPlanet,
      value,
      contractStatus }, {
    where: {
      id
    }
  });

  reply.send('Contract updated!');
};

const deleteContractHandler = async (req, reply) => {
  const { id } = req.params;

  const contract = await Contracts.findAll({
    where: {
      id
    }
  });

  if(Object.keys(contract).length === 0) {
    return reply.status(404).send(new Error("Contract not found"));
  }
  
  await Contracts.destroy({
    where: {
      id
    }
  });

  return reply.send('Contract deleted!');
};

module.exports = { getAllContractsHandler, getContractHandler, postContractHandler, updateContractHandler, deleteContractHandler };