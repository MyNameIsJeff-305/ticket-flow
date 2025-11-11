'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IntraoralSensor extends Model {
    static associate(models) {
      IntraoralSensor.belongsTo(models.DentalPracticeInformation, {
        foreignKey: 'dentalPracticeInformationId',
        onDelete: 'CASCADE'
      });
      IntraoralSensor.hasMany(models.IntraoralSensorImage, {
        foreignKey: 'intraoralSensorId',
        onDelete: 'CASCADE'
      });
    }
  }
  IntraoralSensor.init({
    dentalPracticeInformationId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DentalPracticeInformations',
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
    serialNumber: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'IntraoralSensor',
  });
  return IntraoralSensor;
};