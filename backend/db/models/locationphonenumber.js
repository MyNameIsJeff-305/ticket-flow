'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocationPhoneNumber extends Model {
    static associate(models) {
      LocationPhoneNumber.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
      });
    }
  }
  LocationPhoneNumber.init({
    phoneType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Locations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'LocationPhoneNumber',
  });
  return LocationPhoneNumber;
};