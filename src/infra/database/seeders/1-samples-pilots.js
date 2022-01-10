"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Pilots",
      [
        {
          pilotCertification: 1234567,
          name: 'Matheus',
          age: 22,
          credits: 1000,
          locationPlanet: 'Aqua',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 1235867,
          name: 'Carlos',
          age: 25,
          credits: 2000,
          locationPlanet: 'Andvari',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 2134567,
          name: 'Roberto',
          age: 27,
          credits: 3000,
          locationPlanet: 'Demeter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          pilotCertification: 5134567,
          name: 'Lucas',
          age: 18,
          credits: 4000,
          locationPlanet: 'Calas',
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
    await queryInterface.bulkDelete("Pilots", null, {});
  },
};
