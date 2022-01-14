const typeNumber = { type: "number" };
const typeString = { type: "string" };

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
    required: [
      "pilotCertification",
      "fuelCapacity",
      "fuelLevel",
      "weightCapacity",
    ],
    properties: {
      pilotCertification: typeNumber,
      fuelCapacity: typeNumber,
      fuelLevel: typeNumber,
      weightCapacity: typeNumber,
    },
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
