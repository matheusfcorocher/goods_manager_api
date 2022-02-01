const typeNumber = { type: "integer" };
const typeString = { type: "string" };

const pilot = {
  type: "object",
  properties: {
    pilotCertification: typeNumber,
    name: typeString,
    age: typeNumber,
    credits: typeNumber,
    locationPlanet: typeString,
  },
};

const createPilotSchema = {
  body: {
    type: 'object',
    required: ['pilotCertification', 'name', 'age', 'credits', 'locationPlanet'],
    properties: {
      pilotCertification: typeNumber,
      name: typeString,
      age: typeNumber,
      credits: typeNumber,
      locationPlanet: typeString,
    },
  },
  response: {
    200: typeString,
  }
}

const travelPilotSchema = {
  body: {
    type: 'object',
    properties: {
      destinationPlanet: typeString,
    },
    required: ['destinationPlanet'],
  },
  params: {
    pilotCertification: typeNumber, // convert pilotC... to number
  },
  response: {
    200: pilot, 
  }
}

module.exports = { createPilotSchema, travelPilotSchema };
