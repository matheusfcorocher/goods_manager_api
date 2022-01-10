'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contracts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contracts.belongsTo(models.Pilots, {
        targetKey: 'pilotCertification',
        foreignKey: 'pilotCertification',
        onDelete: 'CASCADE',
      }),
      Contracts.hasOne(models.Cargos, {
        sourceKey: 'cargoId',
        foreignKey: 'cargoId',
        onDelete: 'CASCADE',
      })
    }
  };
  Contracts.init({
    description: DataTypes.TEXT,
    pilotCertification: DataTypes.INTEGER,
    cargoId: DataTypes.INTEGER,
    originPlanet: DataTypes.STRING,
    destinationPlanet: DataTypes.STRING,
    value: DataTypes.INTEGER,
    contractStatus: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Contracts',
  });
  return Contracts;
};