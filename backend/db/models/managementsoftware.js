'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManagementSoftware extends Model {
    static associate(models) {
      ManagementSoftware.belongsTo(models.DentalPracticeInformation, {
        foreignKey: 'dentalPracticeInformationId',
        onDelete: 'CASCADE'
      });
    }
  }
  ManagementSoftware.init({
    dentalPracticeInformationId: { 
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
    modelName: 'ManagementSoftware',
  });
  return ManagementSoftware;
};