'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrinterImage extends Model {
    static associate(models) {
      PrinterImage.belongsTo(models.Printer, {
        foreignKey: 'printerId',
        as: 'printer'
      });
    }
  }
  PrinterImage.init({
    printerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Printers',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'PrinterImage',
  });
  return PrinterImage;
};