'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ships.belongsTo(models.Pilots, {
        foreignKey: 'pilotCertification',
        onDelete: 'CASCADE',
      })
    }
  };
  Ships.init({
    pilotCertification: DataTypes.INTEGER,
    fuelCapacity: DataTypes.INTEGER,
    fuelLevel: DataTypes.INTEGER,
    weightCapacity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ships',
  });
  return Ships;
};