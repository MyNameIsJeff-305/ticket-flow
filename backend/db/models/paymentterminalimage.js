'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentTerminalImage extends Model {
    static associate(models) {
      PaymentTerminalImage.belongsTo(models.PaymentTerminal, {
        foreignKey: 'paymentTerminalId',
        onDelete: 'CASCADE'
      });
    }
  }
  PaymentTerminalImage.init({
    paymentTerminalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PaymentTerminals',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'PaymentTerminalImage',
  });
  return PaymentTerminalImage;
};