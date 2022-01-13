const models = require("../../../../infra/database/models/index.js");
const Resources = models.Resources;

const getAllResourcesHandler = async (req, reply) => {
  const resources = await Resources.findAll();
  reply.send(resources);
};

const getResourceHandler = async (req, reply) => {
  const { id } = req.params;

  const resource = await Resources.findAll({
    where: {
      id,
    },
  });
 
  if (Object.keys(resource).length === 0) {
    return reply.status(404).send({
      errorMsg: "Resource not found",
    });
  }

  reply.send(resource[0]);
};

const postResourceHandler = async (req, reply) => {
  const { name, weight } = req.body;

  await Resources.create({ name, weight });

  reply.send("Resource added!");
};

const updateResourceHandler = async (req, reply) => {
  const { name, weight } = req.body;
  const { id } = req.params;

  const resource = await Resources.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(resource).length === 0) {
    return reply.status(404).send({
      errorMsg: "Resource not found!",
    });
  }

  await Resources.update(
    {
      name,
      weight,
    },
    {
      where: {
        id,
      },
    }
  );

  reply.send("Resource updated!");
};

const deleteResourceHandler = async (req, reply) => {
  const { id } = req.params;

  const resource = await Resources.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(resource).length === 0) {
    return reply.status(404).send(new Error("Resource not found"));
  }

  await Resources.destroy({
    where: {
      id,
    },
  });

  return reply.send("Resource deleted!");
};

module.exports = {
  getAllResourcesHandler,
  getResourceHandler,
  postResourceHandler,
  updateResourceHandler,
  deleteResourceHandler,
};
