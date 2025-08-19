'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Printer extends Model {
    static associate(models) {
      Printer.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Printer.hasMany(models.PrinterImage, {
        foreignKey: 'printerId',
        onDelete: "CASCADE"
      });
    }
  }
  Printer.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    iPAddress: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    iPType: { //If true, static IP. If false, DHCP
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
    connection: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Printer',
  });
  return Printer;
};