'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReconstructionStationImage extends Model {
    static associate(models) {
      ReconstructionStationImage.belongsTo(models.ReconstructionStation, {
        foreignKey: 'reconstructionStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  ReconstructionStationImage.init({
    reconstructionStationId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ReconstructionStations',
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
    modelName: 'ReconstructionStationImage',
  });
  return ReconstructionStationImage;
};