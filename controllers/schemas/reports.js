const typeNumber = { type: "number" };
const typeString = { type: "string" };

const infoPlanet = {
  sent: {
    food: typeNumber,
    minerals: typeNumber,
    water: typeNumber,
  },
  received: {
    food: typeNumber,
    minerals: typeNumber,
    water: typeNumber,
  },
};

const planets = {
  type: "object",
  properties: {
    Andvari: infoPlanet,
    Aqua: infoPlanet,
    Demeter: infoPlanet,
    Calas: infoPlanet,
  }
};

const pilot = {
  type: "object",
  properties: {
    id: typeNumber,
    food: typeString,
    water: typeNumber,
    minerals: typeNumber,
  },
};

const transaction = {
  type: "object",
  properties: {
    about: typeString,
  },
};

const getPilotsReportSchema = {
  response: {
    200: {
      type: "array",
      items: pilot,
    },
  },
};

const getPlanetsReportSchema = {
  response: {
    200: planets
  },
};

const getTransactionsReportSchema = {
  response: {
    200: {
      type: "array",
      items: transaction,
    },
  },
};

module.exports = {
  getPlanetsReportSchema,
  getPilotsReportSchema,
  getTransactionsReportSchema,
};
