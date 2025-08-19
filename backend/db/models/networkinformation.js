'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NetworkInformation extends Model {
    static associate(models) {
      NetworkInformation.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
    }
  }
  NetworkInformation.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    internetServiceProvider: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    publicIP: { 
      type: DataTypes.STRING
    },
    hasStaticIP: { 
      type: DataTypes.STRING,
      allowNull: false //Allowed values: 'yes', 'no', 'unknown'
    },
    staticIP: { 
      type: DataTypes.STRING
    },
    subnet: { 
      type: DataTypes.STRING
    },
    gateway: { 
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'NetworkInformation',
  });
  return NetworkInformation;
};