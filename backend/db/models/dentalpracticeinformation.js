'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DentalPracticeInformation extends Model {
    static associate(models) {
      DentalPracticeInformation.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
      DentalPracticeInformation.hasMany(models.ManagementSoftware, {
        foreignKey: 'dentalPracticeInformationId',
        onDelete: 'CASCADE'
      });
      DentalPracticeInformation.hasMany(models.ImagingSoftware, {
        foreignKey: 'dentalPracticeInformation',
        onDelete: 'CASCADE'
      });
    }
  }
  DentalPracticeInformation.init({
    name: { 
      type: DataTypes.STRING
    },
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    description: { 
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'DentalPracticeInformation',
  });
  return DentalPracticeInformation;
};