'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Resources",
      [
        {
          name: 'water',
          weight: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'water',
          weight: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'minerals',
          weight: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'food',
          weight: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Resources", null, {});
  }
};
