'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client',
        onDelete: 'CASCADE'
      });
      Location.hasMany(models.LocationPhoneNumber, {
        foreignKey: 'locationId',
        as: 'phoneNumbers',
        onDelete: 'CASCADE'
      });
      Location.hasMany(models.Assessment, {
        foreignKey: 'locationId',
        as: 'assessments',
        onDelete: 'CASCADE'
      });
    }
  }
  Location.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    addressLine1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    addressLine2: {
      type: DataTypes.STRING(50)
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};