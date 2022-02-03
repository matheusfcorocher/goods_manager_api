const app = require("fastify")({ logger: false });
const Ajv = require("ajv");
const { Container } = require("./src/container.js");

//validation configs for fastify requests
const schemaCompilers = {
  body: new Ajv({
    removeAdditional: true,
    coerceTypes: false,
    allErrors: false,
  }),
  params: new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    allErrors: false,
  }),
  querystring: new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    allErrors: false,
  }),
  headers: new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    allErrors: false,
  }),
};

app.setValidatorCompiler((req) => {
  if (!req.httpPart) {
    throw new Error("Missing httpPart");
  }
  const compiler = schemaCompilers[req.httpPart];
  if (!compiler) {
    throw new Error(`Missing compiler for ${req.httpPart}`);
  }
  return compiler.compile(req.schema);
});

//Aplying middleware in app request
app.decorateRequest("container", null);
app.addHook("onRequest", async (req, reply) => {
  req.container = Container;
});


//Routes
const opts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

app.get("/api/", opts, (req, reply) => {
  reply.send({ message: "Let's go!" });
});

app.register(require("./src/interfaces/http/routes/contracts.js"));
app.register(require("./src/interfaces/http/routes/pilots.js"));
app.register(require("./src/interfaces/http/routes/ships.js"));
app.register(require("./src/interfaces/http/routes/reports.js"));

module.exports = app;
