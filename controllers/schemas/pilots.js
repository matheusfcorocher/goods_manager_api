const typeNumber = { type: "number" };
const typeString = { type: "string" };

const pilot = {
  type: "object",
  properties: {
    pilot_certification: typeNumber,
    name: typeString,
    age: typeNumber,
    credits: typeNumber,
    location_planet: typeString,
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
    pilot_certification: typeNumber,
  },
  response: {
    200: pilot
  },
};

const postPilotSchema = {
  body: {
    type: 'object',
    required: ['pilot_certification', 'name', 'age', 'credits', 'location_planet'],
    properties: {
      pilot_certification: typeNumber,
      name: typeString,
      age: typeNumber,
      credits: typeNumber,
      location_planet: typeString,
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
      location_planet: typeString,
    },
  },
  params: {
    pilot_certification: typeNumber, // convert pilot_c... to number
  },
  response: {
    200: typeString, 
  }
}

const deletePilotSchema = {
  params: {
    pilot_certification: typeNumber, // converts the id param to number
  },
  response: {
    200: typeString,
  },
};



module.exports = { getAllPilotsSchema, getPilotSchema, postPilotSchema, updatePilotSchema, deletePilotSchema };
