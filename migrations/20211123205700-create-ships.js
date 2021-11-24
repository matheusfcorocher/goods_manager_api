'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pilotCertification: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        unique: true,
        references: {
          model: 'Pilots',
          key: 'pilotCertification',
          as: 'pilotCertification',
        }
      },
      fuelCapacity: {
        type: Sequelize.INTEGER
      },
      fuelLevel: {
        type: Sequelize.INTEGER
      },
      weightCapacity: {
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
    await queryInterface.dropTable('Ships');
  }
};