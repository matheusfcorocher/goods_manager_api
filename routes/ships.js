const shipsRoutes = (fastify, options, done) => {
    fastify.get('/api/ships', (req, reply) => {
      reply.send('Hello world');
    });
    done();
};

module.exports = shipsRoutes;