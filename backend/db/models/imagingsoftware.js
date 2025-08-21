'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImagingSoftware extends Model {
    static associate(models) {
      ImagingSoftware.belongsTo(models.DentalPracticeInformation, {
        foreignKey: 'dentalPracticeInformation',
        onDelete: 'CASCADE'
      });
    }
  }
  ImagingSoftware.init({
    dentalPracticeInformation: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DentalPracticeInformations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    servername: { 
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
    modelName: 'ImagingSoftware',
  });
  return ImagingSoftware;
};