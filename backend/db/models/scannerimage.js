'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScannerImage extends Model {
    static associate(models) {
      ScannerImage.belongsTo(models.Scanner, {
        foreignKey: 'scannerId',
        onDelete: 'CASCADE'
      });
    }
  }
  ScannerImage.init({
    scannerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Scanners',
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
    modelName: 'ScannerImage',
  });
  return ScannerImage;
};