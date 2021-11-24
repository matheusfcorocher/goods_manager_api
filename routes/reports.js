const reportsRoutes = (fastify, options, done) => {
    fastify.get('/api/reports', (req, reply) => {
      reply.send('Hello world');
    });
    done();
};

module.exports = reportsRoutes;