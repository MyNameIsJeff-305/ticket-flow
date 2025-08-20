'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StationImage extends Model {
    static associate(models) {
      StationImage.belongsTo(models.Station, {
        foreignKey: 'stationId',
        onDelete: 'CASCADE'
      });
    }
  }
  StationImage.init({
    stationId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stations',
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
    modelName: 'StationImage',
  });
  return StationImage;
};