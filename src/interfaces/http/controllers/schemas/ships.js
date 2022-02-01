const typeNumber = { type: 'integer' }
const typeString = { type: "string" }

const ship = {
  type: "object",
  properties: {
    pilotCertification: typeNumber,
    fuelCapacity: typeNumber,
    fuelLevel: typeNumber,
    weightCapacity: typeString,
  },
};

const createShipSchema = {
  body: { 
    type: "object",
    properties: {
      pilotCertification: typeNumber,
      fuelLevel: typeNumber,
      fuelCapacity: typeNumber,
      weightCapacity: typeNumber,
    },
    additionalProperties: false,
    coerceTypes: false,
    required: [
      "pilotCertification",
      "fuelCapacity",
      "fuelLevel",
      "weightCapacity",
    ],
  },  
  response: {
    200: typeString,
  },
};

const refillShipSchema = {
  params: {
    pilotCertification: typeNumber, // convert pilotC... to number
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  createShipSchema,
  refillShipSchema,
};
