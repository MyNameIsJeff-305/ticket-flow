'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    static associate(models) {
      Assessment.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
      });
      Assessment.hasMany(models.NetworkInformation, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Assessment.hasMany(models.Firewall, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Assessment.hasMany(models.Server, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
      Assessment.hasMany(models.AccessPoint, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Assessment.hasMany(models.Switch, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Assessment.hasMany(models.CCTV, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
    }
  }
  Assessment.init({
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    locationId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { 
        model: 'Locations', 
        key: 'id' 
      },
      onDelete: 'CASCADE' 
    }
  }, {
    sequelize,
    modelName: 'Assessment',
  });
  return Assessment;
};