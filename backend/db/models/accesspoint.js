'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccessPoint.init({
    assessmentId: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AccessPoint',
  });
  return AccessPoint;
};