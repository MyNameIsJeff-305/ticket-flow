'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessPoint extends Model {
    static associate(models) {
      AccessPoint.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
    }
  }
  AccessPoint.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    brand: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    model: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AccessPoint',
  });
  return AccessPoint;
};