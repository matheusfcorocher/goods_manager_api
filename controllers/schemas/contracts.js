const typeNumber = { type: "number" };
const typeString = { type: "string" };

const contract = {
  type: "object",
  properties: {
    pilotCertification: typeNumber,
    cargoId: typeNumber,
    description: typeString,
    originPlanet: typeString,
    destinationPlanet: typeString,
    value: typeNumber,
    contractStatus: typeString,
  },
};

const getAllContractsSchema = {
  response: {
    200: {
      type: "array",
      items: contract,
    },
  },
};

const getContractSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: contract,
  },
};

const postContractSchema = {
  body: {
    type: "object",
    required: [
      "cargoId",
      "description",
      "originPlanet",
      "destinationPlanet",
      "value",
    ],
    properties: {
      pilotCertification: typeNumber,
      cargoId: typeNumber,
      description: typeString,
      originPlanet: typeString,
      destinationPlanet: typeString,
      value: typeNumber,
      contractStatus: typeString,
    },
  },
  response: {
    200: typeString,
  },
};

const updateContractSchema = {
  body: {
    type: "object",
    properties: {
        pilotCertification: typeNumber,
        cargoId: typeNumber,
        description: typeString,
        originPlanet: typeString,
        destinationPlanet: typeString,
        value: typeNumber,
        contractStatus: typeString,
    },
  },
  params: {
    id: typeNumber,
  },
  response: {
    200: typeString,
  },
};

const deleteContractSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  getAllContractsSchema,
  getContractSchema,
  postContractSchema,
  updateContractSchema,
  deleteContractSchema,
};
