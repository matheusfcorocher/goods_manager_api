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
      cargoId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Cargos',
          key: 'id',
          as: 'cargoId',
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
      contractStatus: {
        type: Sequelize.STRING,
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