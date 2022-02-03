const ContractSerializer = require("../serializers/ContractSerializer.js");

const acceptContractHandler = async (req, reply) => {
  try {
    const { acceptContract } = req.container.contracts;
    const { id } = req.params;
    const result = await acceptContract.execute(id, req.body);
    reply.send(ContractSerializer.serialize(result));
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const fulfillContractHandler = async (req, reply) => {
  try {
    const { fulfillContract } = req.container.contracts;
    const { id } = req.params;
    const result = await fulfillContract.execute(id);
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const getAllContractsHandler = async (req, reply) => {
  try {
    const { getAllContracts } = req.container.contracts;
    const { contractStatus } = req.query;
    const result = await getAllContracts.execute(contractStatus);
    reply.send(result);
  } catch (error) {
    switch (error.CODE) {
      default:
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

const publishContractHandler = async (req, reply) => {
  try {
    const { publishContract } = req.container.contracts;
    await publishContract.execute(req.body);
    reply.send("Contract was added successfully!");
  } catch (error) {
    switch (error.CODE) {
      case "VALIDATION_ERROR":
        return reply.status(400).send({ message: error.errors });
      case "NOTFOUND_ERROR":
        return reply.status(404).send({ message: error.message });
      default:
        console.log(error)
        const {message, details} = error;
        return reply.status(500).send({message, details});
    }
  }
};

module.exports = {
  acceptContractHandler,
  getAllContractsHandler,
  publishContractHandler,
  fulfillContractHandler,
};
