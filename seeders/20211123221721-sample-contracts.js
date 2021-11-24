'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Contracts",
      [
        {
          pilotCertification: 1234567,
          resourceId: 4,
          description: 'This contract is super important for our company.',
          originPlanet: 'Aqua',
          destinationPlanet: 'Demeter',
          value: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'This contract is super important for our company.',
          resourceId: 3,
          originPlanet: 'Andvari',
          destinationPlanet: 'Demeter',
          value: 1500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          resourceId: 2,
          description: 'This contract is super important for our company.',
          originPlanet: 'Calas',
          destinationPlanet: 'Aqua',
          value: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 5134567,
          description: 'This contract is super important for our company.',
          resourceId: 2,
          originPlanet: 'Demeter',
          destinationPlanet: 'Calas',
          value: 2000,
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
