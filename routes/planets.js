const planetsRoutes = (fastify, options, done) => {
    fastify.get('/api/planets', (req, reply) => {
      reply.send('Hello world');
    });
    done();
};

module.exports = planetsRoutes;