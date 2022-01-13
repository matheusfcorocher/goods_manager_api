const typeNumber = { type: "number" };
const typeString = { type: "string" };

const contract = {
  type: "object",
  properties: {
    id: typeNumber,
    pilotCertification: typeNumber,
    cargoId: typeNumber,
    description: typeString,
    originPlanet: typeString,
    destinationPlanet: typeString,
    value: typeNumber,
    contractStatus: typeString,
  },
};

const acceptContractSchema = {
  body: {
    type: "object",
    required: ["pilotCertification"],
    properties: {
        pilotCertification: typeNumber,
    },
  },
  params: {
    id: typeNumber,
  },
  response: {
    200: contract,
  },
};

const fulfillContractSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: typeString,
  },
};

const getAllContractsSchema = {
  response: {
    200: {
      type: "array",
      items: contract,
    },
  },
  querystring: {
    contractStatus: typeString,
  }
};

const publishContractSchema = {
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
      cargoId: typeNumber,
      description: typeString,
      originPlanet: typeString,
      destinationPlanet: typeString,
      value: typeNumber,
    },
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  acceptContractSchema,
  fulfillContractSchema,
  getAllContractsSchema,
  publishContractSchema,
};
