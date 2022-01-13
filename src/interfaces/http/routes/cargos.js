const {
    getAllCargosSchema,
    getCargoSchema,
    postCargoSchema,
    updateCargoSchema,
    deleteCargoSchema,
  } = require("../controllers/schemas/cargos.js");
  const {
    getAllCargosHandler,
    getCargoHandler,
    postCargoHandler,
    updateCargoHandler,
    deleteCargoHandler,
  } = require("../controllers/handlers/cargos.js");
  
  const getAllCargosOpts = {
    schema: getAllCargosSchema,
    handler: getAllCargosHandler,
  };
  
  const getCargoOpts = {
    schema: getCargoSchema,
    handler: getCargoHandler,
  };
  
  const postCargoOpts = {
    schema: postCargoSchema,
    handler: postCargoHandler,
  };
  
  const updateCargoOpts = {
    schema: updateCargoSchema,
    handler: updateCargoHandler,
  };
  
  const deleteCargoOpts = {
    schema: deleteCargoSchema,
    handler: deleteCargoHandler,
  };
  
  const cargosRoutes = (fastify, options, done) => {
    fastify.get("/api/cargos", getAllCargosOpts);
    fastify.get("/api/cargos/:id", getCargoOpts);
    fastify.post("/api/cargos/new", postCargoOpts);
    fastify.put('/api/cargos/edit/:id', updateCargoOpts);
    fastify.delete('/api/cargos/:id', deleteCargoOpts);
  
    done();
  };
  
  module.exports = cargosRoutes;
  