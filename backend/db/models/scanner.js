'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scanner extends Model {
    static associate(models) {
      Scanner.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Scanner.hasMany(models.ScannerImage, {
        foreignKey: 'scannerId',
        onDelete: 'CASCADE'
      });
    }
  }
  Scanner.init({
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    iPAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iPType: { //If true, static. If false, DHCP
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    connection: { //Wifi, Cable, USB, Bluetooth
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Scanner',
  });
  return Scanner;
};