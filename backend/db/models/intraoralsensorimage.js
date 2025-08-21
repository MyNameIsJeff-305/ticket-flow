'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IntraoralSensorImage extends Model {
    static associate(models) {
      IntraoralSensorImage.belongsTo(models.IntraoralSensor, {
        foreignKey: 'intraoralSensorId',
        onDelete: 'CASCADE'
      });
    }
  }
  IntraoralSensorImage.init({
    intraoralSensorId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IntraoralSensors',
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
    modelName: 'IntraoralSensorImage',
  });
  return IntraoralSensorImage;
};