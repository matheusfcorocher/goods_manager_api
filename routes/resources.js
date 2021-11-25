const {
  getAllResourcesSchema,
  getResourceSchema,
  postResourceSchema,
  updateResourceSchema,
  deleteResourceSchema,
} = require("../controllers/schemas/resources.js");
const {
  getAllResourcesHandler,
  getResourceHandler,
  postResourceHandler,
  updateResourceHandler,
  deleteResourceHandler,
} = require("../controllers/handlers/resources.js");

const getAllResourcesOpts = {
  schema: getAllResourcesSchema,
  handler: getAllResourcesHandler,
};

const getResourceOpts = {
  schema: getResourceSchema,
  handler: getResourceHandler,
};

const postResourceOpts = {
  schema: postResourceSchema,
  handler: postResourceHandler,
};

const updateResourceOpts = {
  schema: updateResourceSchema,
  handler: updateResourceHandler,
};

const deleteResourceOpts = {
  schema: deleteResourceSchema,
  handler: deleteResourceHandler,
};

const resourcesRoutes = (fastify, options, done) => {
  fastify.get("/api/resources", getAllResourcesOpts);
  fastify.get("/api/resources/:id", getResourceOpts);
  fastify.post("/api/resources/new", postResourceOpts);
  fastify.put('/api/resources/edit/:id', updateResourceOpts);
  fastify.delete('/api/resources/:id', deleteResourceOpts);

  done();
};

module.exports = resourcesRoutes;
