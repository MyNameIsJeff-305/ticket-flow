'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReconstructionStation extends Model {
    static associate(models) {
      ReconstructionStation.belongsTo(models.Panoramic, {
        foreignKey: 'panoramicId',
        onDelete: 'CASCADE'
      });
    }
  }
  ReconstructionStation.init({
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
    modelName: 'ReconstructionStation',
  });
  return ReconstructionStation;
};