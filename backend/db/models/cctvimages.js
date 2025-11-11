'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cctvImages extends Model {
    static associate(models) {
      cctvImages.belongsTo(models.CCTV, {
        foreignKey: 'cctvId',
        onDelete: "CASCADE"
      });
    }
  }
  cctvImages.init({
    cctvId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CCTVs',
        key: 'id'
      },
      onDelete: "CASCADE"
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
    modelName: 'cctvImages',
  });
  return cctvImages;
};