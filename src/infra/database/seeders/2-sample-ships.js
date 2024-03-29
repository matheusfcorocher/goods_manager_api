'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert(
      "Ships",
      [
        {
          pilotCertification: 1234567,
          fuelCapacity: 500,
          fuelLevel: 300,
          weightCapacity: 1800,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 1235867,
          fuelCapacity: 300,
          fuelLevel: 250,
          weightCapacity: 1500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 2134567,
          fuelCapacity: 1000,
          fuelLevel: 500,
          weightCapacity: 2500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 5134567,
          fuelCapacity: 700,
          fuelLevel: 200,
          weightCapacity: 1500,
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
     await queryInterface.bulkDelete("Ships", null, {});
  }
};
