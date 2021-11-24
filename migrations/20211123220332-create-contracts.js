'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pilotCertification: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Pilots',
          key: 'pilotCertification',
          as: 'pilotCertification',
        }
      },
      resourceId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Resources',
          key: 'id',
          as: 'ResourceId',
        }
      },
      description: {
        type: Sequelize.TEXT
      },
      originPlanet: {
        type: Sequelize.STRING
      },
      destinationPlanet: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contracts');
  }
};