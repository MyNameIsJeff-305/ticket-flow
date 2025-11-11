'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AudioAmplifierImage extends Model {
    static associate(models) {
      AudioAmplifierImage.belongsTo(models.audioAmplifier, {
        foreignKey: 'audioAmplifierId',
        onDelete: 'CASCADE'
      });
    }
  }
  AudioAmplifierImage.init({
    audioAmplifierId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'audioAmplifiers',
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
    modelName: 'AudioAmplifierImage',
  });
  return AudioAmplifierImage;
};