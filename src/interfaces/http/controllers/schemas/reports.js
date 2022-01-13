const Planets = require("../../../../domain/entities/Planet");

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

let ps = {}
Object.keys(Planets).map(key => ps[Planets[key]] = infoPlanet)

const planets = {
  type: "object",
  properties: ps,
};

const pilot = {
  type: "object",
  properties: {
    id: typeNumber,
    pilotCertification: typeNumber,
    transporting: {
      food: typeString,
      water: typeNumber,
      minerals: typeNumber,
    }
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
      items: typeString,
    },
  },
};

module.exports = {
  getPlanetsReportSchema,
  getPilotsReportSchema,
  getTransactionsReportSchema,
};
