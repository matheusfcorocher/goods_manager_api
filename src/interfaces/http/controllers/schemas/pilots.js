const typeNumber = { type: "number" };
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

const getAllPilotsSchema = {
  response: {
    200: {
      type: "array",
      items: pilot,
    },
  },
};

const getPilotSchema = {
  params: {
    pilotCertification: typeNumber,
  },
  response: {
    200: pilot
  },
};

const postPilotSchema = {
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

const updatePilotSchema = {
  body: {
    type: 'object',
    properties: {
      name: typeString,
      age: typeNumber,
      credits: typeNumber,
      locationPlanet: typeString,
    },
  },
  params: {
    pilotCertification: typeNumber, // convert pilotC... to number
  },
  response: {
    200: pilot, 
  }
}

const travelPilotSchema = {
  body: {
    type: 'object',
    properties: {
      destinationPlanet: typeString,
    },
  },
  params: {
    pilotCertification: typeNumber, // convert pilotC... to number
  },
  response: {
    200: pilot, 
  }
}

const deletePilotSchema = {
  params: {
    pilotCertification: typeNumber, // converts the id param to number
  },
  response: {
    200: typeString,
  },
};



module.exports = { getAllPilotsSchema, getPilotSchema, postPilotSchema, updatePilotSchema, travelPilotSchema, deletePilotSchema };
