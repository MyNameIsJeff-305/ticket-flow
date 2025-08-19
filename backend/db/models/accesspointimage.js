'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessPointImage extends Model {
    static associate(models) {
      AccessPointImage.belongsTo(models.AccessPoint, {
        foreignKey: 'accessPointId',
        onDelete: "CASCADE"
      });
    }
  }
  AccessPointImage.init({
    accessPointId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AccessPoints',
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
    modelName: 'AccessPointImage',
  });
  return AccessPointImage;
};