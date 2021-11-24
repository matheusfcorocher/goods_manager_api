const fastify = require("fastify")({ logger: true });

fastify.get("/", (req, reply) => {
  reply.send("Let's go!");
});

const PORT = process.env.PORT || 5000;

fastify.register(require("./routes/contracts.js"));
fastify.register(require("./routes/pilots.js"));
fastify.register(require("./routes/planets"));
fastify.register(require("./routes/reports"));
fastify.register(require("./routes/resources"));
fastify.register(require("./routes/ships"));

const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    sequelize.close();
    process.exit(1);
  }
};

startServer();
