'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CCTV extends Model {
    static associate(models) {
      CCTV.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      CCTV.hasMany(models.cctvImages, {
        foreignKey: 'cctvId',
        onDelete: "CASCADE"
      });
    }
  }
  CCTV.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    type: { //Allowed values: 'NVR', 'DVR'
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'CCTV',
  });
  return CCTV;
};