'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class audioAmplifier extends Model {
    static associate(models) {
      audioAmplifier.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
      audioAmplifier.hasMany(models.AudioAmplifierImage, {
        foreignKey: 'audioAmplifierId',
        onDelete: 'CASCADE'
      });
    }
  }
  audioAmplifier.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assessments',
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
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'audioAmplifier',
  });
  return audioAmplifier;
};