const {
  getAllResourcesSchema,
  getResourcesSchema,
  postResourcesSchema,
  updateResourcesSchema,
  deleteResourcesSchema,
} = require("../controllers/schemas/resources.js");
const {
  getAllResourcesHandler,
  getResourcesHandler,
  postResourcesHandler,
  updateResourcesHandler,
  deleteResourcesHandler,
} = require("../controllers/handlers/resources.js");

const getAllResourcessOpts = {
  schema: getAllResourcesSchema,
  handler: getAllResourcesHandler,
};

const getResourcesOpts = {
  schema: getResourcesSchema,
  handler: getResourcesHandler,
};

const postResourcesOpts = {
  schema: postResourcesSchema,
  handler: postResourcesHandler,
};

const updateResourcesOpts = {
  schema: updateResourcesSchema,
  handler: updateResourcesHandler,
};

const deleteResourcesOpts = {
  schema: deleteResourcesSchema,
  handler: deleteResourcesHandler,
};

const resourcesRoutes = (fastify, options, done) => {
  fastify.get("/api/resources", getAllResourcessOpts);
  fastify.get("/api/resources/:id", getResourcesOpts);
  fastify.post("/api/resources/new", postResourcesOpts);
  fastify.put('/api/resources/edit/:id', updateResourcesOpts);
  fastify.delete('/api/resources/:id', deleteResourcesOpts);

  done();
};

module.exports = resourcesRoutes;
