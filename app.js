const fastify = require("fastify")({ logger: true });

fastify.get("/", (req, reply) => {
  reply.send("Let's go!");
});

const PORT = process.env.PORT || 5000;

fastify.register(require("./src/interfaces/http/routes/cargos.js"));
fastify.register(require("./src/interfaces/http/routes/contracts.js"));
fastify.register(require("./src/interfaces/http/routes/pilots.js"));
fastify.register(require("./src/interfaces/http/routes/resources.js"));
fastify.register(require("./src/interfaces/http/routes/ships.js"));
fastify.register(require("./src/interfaces/http/routes/transactions.js"));
fastify.register(require("./src/interfaces/http/routes/reports.js"));

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
