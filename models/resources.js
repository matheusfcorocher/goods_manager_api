'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resources extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Resources.init({
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resources',
  });
  return Resources;
};