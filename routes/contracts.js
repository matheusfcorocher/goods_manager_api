const contractsRoutes = (fastify, options, done) => {
    fastify.get('/api/contracts', (req, reply) => {
      reply.send('Hello world');
    });
    done();
};

module.exports = contractsRoutes;