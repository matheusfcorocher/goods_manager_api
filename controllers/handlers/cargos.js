const models = require("../../src/infra/database/models/index.js");
const Cargos = models.Cargos;

const getAllCargosHandler = async (req, reply) => {
  const cargos = await Cargos.findAll();
  reply.send(cargos);
};

const getCargoHandler = async (req, reply) => {
  const { id } = req.params;

  const cargo = await Cargos.findAll({
    where: {
      id,
    },
  });
  // const cargo = cargos.filter((cargo) => {
  //   return cargo.cargo_certification === cargo_certification;
  // })[0];

  if (Object.keys(cargo).length === 0) {
    return reply.status(404).send({
      errorMsg: "Cargo not found",
    });
  }

  reply.send(cargo[0]);
};

const postCargoHandler = async (req, reply) => {
  const { cargoId, resourceId } = req.body;

  await Cargos.create({ cargoId, resourceId });

  reply.send("Cargo added!");
};

const updateCargoHandler = async (req, reply) => {
  const { cargoId, resourceId } = req.body;
  const { id } = req.params;

  const cargo = await Cargos.findAll({
    where: {
      id,
    },
  });

  if (Object.keys(cargo).length === 0) {
    return reply.status(404).send({
      errorMsg: "Cargo not found!",
    });
  }

  await Cargos.update(
    { cargoId, resourceId },
    {
      where: {
        id,
      },
    }
  );

  reply.send("Cargo updated!");
};

const deleteCargoHandler = async (req, reply) => {
  const { id } = req.params;

  const cargo = await Cargos.findAll({
    where: {
      id
    },
  });

  if (Object.keys(cargo).length === 0) {
    return reply.status(404).send(new Error("Cargo not found"));
  }

  await Cargos.destroy({
    where: {
      id
    },
  });

  return reply.send("Cargo deleted!");
};

module.exports = {
  getAllCargosHandler,
  getCargoHandler,
  postCargoHandler,
  updateCargoHandler,
  deleteCargoHandler,
};
