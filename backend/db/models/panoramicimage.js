'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PanoramicImage extends Model {
    static associate(models) {
      PanoramicImage.belongsTo(models.Panoramic, {
        foreignKey: 'panoramicId',
        onDelete: 'CASCADE'
      });
    }
  }
  PanoramicImage.init({
    panoramicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Panoramics',
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
    modelName: 'PanoramicImage',
  });
  return PanoramicImage;
};