'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentTerminal extends Model {
    static associate(models) {
      PaymentTerminal.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
    }
  }
  PaymentTerminal.init({
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iPAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iPType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PaymentTerminal',
  });
  return PaymentTerminal;
};