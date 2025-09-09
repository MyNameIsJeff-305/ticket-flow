'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartImage extends Model {
    static associate(models) {
      PartImage.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE'
      });
    }
  }
  PartImage.init({
    partId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parts',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    partImageURL: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'PartImage',
  });
  return PartImage;
};