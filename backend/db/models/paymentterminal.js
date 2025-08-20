'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentTerminal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentTerminal.init({
    assessmentId: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    iPAddress: DataTypes.STRING,
    iPType: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentTerminal',
  });
  return PaymentTerminal;
};