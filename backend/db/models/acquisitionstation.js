'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcquisitionStation extends Model {
    static associate(models) {
      AcquisitionStation.belongsTo(models.Panoramic, {
        foreignKey: 'panoramicId',
        onDelete: 'CASCADE'
      });
      AcquisitionStation.hasMany(models.AcquisitionStationImage, {
        foreignKey: 'acquisitionStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  AcquisitionStation.init({
    panoramicId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Panoramics',
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
    }
  }, {
    sequelize,
    modelName: 'AcquisitionStation',
  });
  return AcquisitionStation;
};