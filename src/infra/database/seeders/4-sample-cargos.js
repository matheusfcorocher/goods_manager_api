'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Cargos",
      [
        {
          cargoId: 1,
          resourceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cargoId: 1,
          resourceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cargoId: 1,
          resourceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cargoId: 2,
          resourceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cargoId: 3,
          resourceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cargoId: 4,
          resourceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Cargos", null, {});
  }
};
