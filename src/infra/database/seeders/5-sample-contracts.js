'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Contracts",
      [
        {
          pilotCertification: 1234567,
          cargoId: 1,
          description: 'water, food and minerals to Demeter.',
          originPlanet: 'Aqua',
          destinationPlanet: 'Demeter',
          value: 4000,
          contractStatus: 'IN PROGRESS',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'food to Demeter.',
          cargoId: 2,
          originPlanet: 'Andvari',
          destinationPlanet: 'Demeter',
          value: 1500,
          contractStatus: 'CREATED',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cargoId: 3,
          description: 'minerals to Aqua.',
          originPlanet: 'Calas',
          destinationPlanet: 'Aqua',
          value: 1000,
          contractStatus: 'CREATED',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 5134567,
          description: 'food to Calas.',
          cargoId: 4,
          originPlanet: 'Demeter',
          destinationPlanet: 'Calas',
          value: 2000,
          contractStatus: 'IN PROGRESS',
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
     await queryInterface.bulkDelete("Contracts", null, {});
  }
};
