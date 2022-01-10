'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pilots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pilots.hasOne(models.Ships, {
        sourceKey: 'pilotCertification',
        foreignKey: 'pilotCertification',
      }),
      Pilots.hasMany(models.Contracts, {
        sourceKey: 'pilotCertification',
        foreignKey: 'pilotCertification',
      })
    }
  };
  Pilots.init({
    pilotCertification: DataTypes.INTEGER,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    credits: DataTypes.INTEGER,
    locationPlanet: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pilots',
  });
  return Pilots;
};