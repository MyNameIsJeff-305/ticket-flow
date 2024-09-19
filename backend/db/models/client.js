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
      })
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
    }
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};