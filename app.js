const app = require("fastify")({ logger: true });

let opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'}
        }
      }
    }
  }
}
app.get("/", opts, (req, reply) => {
  reply.send({message: "Let's go!"});
});

app.register(require("./src/interfaces/http/routes/contracts.js"));
app.register(require("./src/interfaces/http/routes/pilots.js"));
app.register(require("./src/interfaces/http/routes/ships.js"));
app.register(require("./src/interfaces/http/routes/reports.js"));

module.exports = app;
