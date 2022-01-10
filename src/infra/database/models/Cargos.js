'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cargos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cargos.hasOne(models.Resources, {
        sourceKey: 'resourceId',
        foreignKey: 'id',
        onDelete: 'CASCADE',
      }),
      Cargos.belongsTo(models.Contracts, {
        targetKey: 'cargoId',
        foreignKey: 'cargoId',
        onDelete: 'CASCADE',
      })
    }
  };
  Cargos.init({
    cargoId: DataTypes.INTEGER,
    resourceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cargos',
  });
  return Cargos;
};