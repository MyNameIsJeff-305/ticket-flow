'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AcquisitionStationImage extends Model {
    static associate(models) {
      AcquisitionStationImage.belongsTo(models.AcquisitionStation, {
        foreignKey: 'acquisitionStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  AcquisitionStationImage.init({
    acquisitionStationId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AcquisitionStations',
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
    modelName: 'AcquisitionStationImage',
  });
  return AcquisitionStationImage;
};