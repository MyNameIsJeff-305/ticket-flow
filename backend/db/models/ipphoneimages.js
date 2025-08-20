'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IPPhoneImages extends Model {
    static associate(models) {
      IPPhoneImages.belongsTo(models.IPPhone, {
        foreignKey: 'iPPhoneId',
        onDelete: 'CASCADE'
      });
    }
  }
  IPPhoneImages.init({
    iPPhoneId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'IPPhones',
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
    modelName: 'IPPhoneImages',
  });
  return IPPhoneImages;
};