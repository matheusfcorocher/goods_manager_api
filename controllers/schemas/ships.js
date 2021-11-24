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

const getAllShipsSchema = {
  response: {
    200: {
      type: "array",
      items: ship,
    },
  },
};

const getShipSchema = {
  params: {
    pilotCertification: typeNumber,
  },
  response: {
    200: ship,
  },
};

const postShipSchema = {
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

const updateShipSchema = {
  body: {
    type: "object",
    properties: {
      pilotCertification: typeNumber,
      fuelCapacity: typeNumber,
      fuelLevel: typeNumber,
      weightCapacity: typeNumber,
    },
  },
  params: {
    pilotCertification: typeNumber, // convert pilotC... to number
  },
  response: {
    200: typeString,
  },
};

const deleteShipSchema = {
  params: {
    pilotCertification: typeNumber, // converts the id param to number
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  getAllShipsSchema,
  getShipSchema,
  postShipSchema,
  updateShipSchema,
  deleteShipSchema,
};
