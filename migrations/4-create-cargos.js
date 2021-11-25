'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cargos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cargoId: {
        type: Sequelize.INTEGER
      },
      resourceId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Resources',
          key: 'id',
          as: 'resourceId',
        }
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
    await queryInterface.dropTable('Cargos');
  }
};