const resourcesRoutes = (fastify, options, done) => {
    fastify.get('/api/resources', (req, reply) => {
      reply.send('Hello world');
    });
    done();
};

module.exports = resourcesRoutes;