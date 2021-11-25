const typeNumber = { type: "number" };
const typeString = { type: "string" };

const resource = {
  type: "object",
  properties: {
    name: typeString,
    weight: typeNumber,
  },
};

const getAllResourcesSchema = {
  response: {
    200: {
      type: "array",
      items: resource,
    },
  },
};

const getResourceSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: resource,
  },
};

const postResourceSchema = {
  body: {
    type: "object",
    required: ["name", "weight"],
    properties: {
        name: typeString,
        weight: typeNumber,
    },
  },
  response: {
    200: typeString,
  },
};

const updateResourceSchema = {
  body: {
    type: "object",
    properties: {
        name: typeString,
        weight: typeNumber,
    },
  },
  params: {
    id: typeNumber, 
  },
  response: {
    200: typeString,
  },
};

const deleteResourceSchema = {
  params: {
    id: typeNumber, 
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  getAllResourcesSchema,
  getResourceSchema,
  postResourceSchema,
  updateResourceSchema,
  deleteResourceSchema,
};
