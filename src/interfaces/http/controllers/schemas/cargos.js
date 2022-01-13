const typeNumber = { type: "number" };
const typeString = { type: "string" };

const cargo = {
  type: "object",
  properties: {
    cargoId: typeNumber,
    resourceId: typeNumber,
  },
};

const getAllCargosSchema = {
  response: {
    200: {
      type: "array",
      items: cargo,
    },
  },
};

const getCargoSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: cargo,
  },
};

const postCargoSchema = {
  body: {
    type: "object",
    required: ["cargoId", "resourceId"],
    properties: {
      cargoId: typeNumber,
      resourceId: typeNumber,
    },
  },
  response: {
    200: typeString,
  },
};

const updateCargoSchema = {
  body: {
    type: "object",
    properties: {
      cargoId: typeNumber,
      resourceId: typeNumber,
    },
  },
  params: {
    id: typeNumber, 
  },
  response: {
    200: typeString,
  },
};

const deleteCargoSchema = {
  params: {
    id: typeNumber, 
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  getAllCargosSchema,
  getCargoSchema,
  postCargoSchema,
  updateCargoSchema,
  deleteCargoSchema,
};
