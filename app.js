const app = require("fastify")({ logger: true });

app.get("/", (req, reply) => {
  reply.send("Let's go!");
});

app.register(require("./src/interfaces/http/routes/contracts.js"));
app.register(require("./src/interfaces/http/routes/pilots.js"));
app.register(require("./src/interfaces/http/routes/ships.js"));
app.register(require("./src/interfaces/http/routes/reports.js"));

module.exports = app;
