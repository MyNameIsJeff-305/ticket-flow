'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NasStationImages extends Model {
    static associate(models) {
      NasStationImages.belongsTo(models.nasStation, {
        foreignKey: 'nasStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  NasStationImages.init({
    nasStationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nasStations',
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
    modelName: 'NasStationImages',
  });
  return NasStationImages;
};