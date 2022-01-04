const models = require("../../models/index.js");
const { Contracts, Pilots, Cargos, Resources } = models;

const findNestedPilots = async () => {
  return await Pilots.findAll({
    include: [
      {
        model: Contracts,
        where: {
          contractStatus: "IN PROGRESS",
        },
        include: [
          {
            model: Cargos,
            include: [
              {
                model: Resources,
              },
            ],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });
};

module.exports = { findNestedPilots };
