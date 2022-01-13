const typeNumber = { type: "number" };
const typeString = { type: "string" };

const transaction = {
  type: "object",
  properties: {
    id: typeNumber,
    about: typeString,
  },
};

const getAllTransactionsSchema = {
  response: {
    200: {
      type: "array",
      items: transaction,
    },
  },
};

const getTransactionSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: transaction,
  },
};

const postTransactionSchema = {
  body: {
    type: "object",
    required: ["about"],
    properties: {
      about: typeString,
    },
  },
  response: {
    200: typeString,
  },
};

const updateTransactionSchema = {
  body: {
    type: "object",
    properties: {
      about: typeString,
    },
  },
  params: {
    id: typeNumber,
  },
  response: {
    200: transaction,
  },
};

const deleteTransactionSchema = {
  params: {
    id: typeNumber,
  },
  response: {
    200: typeString,
  },
};

module.exports = {
  getAllTransactionsSchema,
  getTransactionSchema,
  postTransactionSchema,
  updateTransactionSchema,
  deleteTransactionSchema,
};
