'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Panoramic extends Model {
    static associate(models) {
      Panoramic.belongsTo(models.DentalPracticeInformation, {
        foreignKey: 'dentalPracticeInformationId',
        onDelete: 'CASCADE'
      });
    }
  }
  Panoramic.init({
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
    networkDeployed: { 
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Panoramic',
  });
  return Panoramic;
};