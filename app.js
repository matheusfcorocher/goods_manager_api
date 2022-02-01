const app = require("fastify")({ logger: false });
const Ajv = require('ajv')

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

const ajv = new Ajv({
  // the fastify defaults (if needed)
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: false,
  nullable: true,
  // any other options
  // ...
})
app.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})

app.get("/", opts, (req, reply) => {
  reply.send({message: "Let's go!"});
});

app.register(require("./src/interfaces/http/routes/contracts.js"));
app.register(require("./src/interfaces/http/routes/pilots.js"));
app.register(require("./src/interfaces/http/routes/ships.js"));
app.register(require("./src/interfaces/http/routes/reports.js"));

module.exports = app;
