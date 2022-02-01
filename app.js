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

// const ajv = new Ajv({
//   // the fastify defaults (if needed)
//   removeAdditional: true,
//   useDefaults: true,
//   coerceTypes: false,
//   nullable: true,
//   // any other options
//   // ...
// })
// app.setValidatorCompiler(({ schema, method, url, httpPart }) => {
//   return ajv.compile(schema)
// })

const schemaCompilers = {
  body: new Ajv({
    removeAdditional: true,
    coerceTypes: false,
    allErrors: false
  }),
  params: new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    allErrors: false
  }),
  querystring: new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    allErrors: false
  }),
  headers: new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    allErrors: false
  })
}

app.setValidatorCompiler(req => {
    if (!req.httpPart) {
      throw new Error('Missing httpPart')
    }
    const compiler = schemaCompilers[req.httpPart]
    if (!compiler) {
      throw new Error(`Missing compiler for ${req.httpPart}`)
    }
    return compiler.compile(req.schema)
})

app.get("/", opts, (req, reply) => {
  reply.send({message: "Let's go!"});
});

app.register(require("./src/interfaces/http/routes/contracts.js"));
app.register(require("./src/interfaces/http/routes/pilots.js"));
app.register(require("./src/interfaces/http/routes/ships.js"));
app.register(require("./src/interfaces/http/routes/reports.js"));

module.exports = app;
