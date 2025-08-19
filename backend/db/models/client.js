'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      Client.hasMany(models.Ticket, {
        foreignKey: 'clientId',
        onDelete: 'CASCADE'
      });
      Client.hasMany(models.Location, {
        foreignKey: 'clientId',
        as: 'locations',
        onDelete: 'CASCADE'
      });
    }
  }
  Client.init({
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      unique: true
    },
    profilePicUrl: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};