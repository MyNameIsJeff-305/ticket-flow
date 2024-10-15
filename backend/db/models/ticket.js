'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.User, {
        foreignKey: 'createdBy',
        onDelete: 'CASCADE'
      }),
        Ticket.belongsTo(models.Client, {
          foreignKey: 'clientId',
          onDelete: 'CASCADE'
        })
      Ticket.belongsTo(models.Status, {
        foreignKey: 'statusId',
        onDelete: 'CASCADE'
      })
      Ticket.hasMany(models.Note, {
        foreignKey: 'ticketId',
        onDelete: 'CASCADE'
      })
      Ticket.hasMany(models.Part, {
        foreignKey: 'ticketId',
        onDelete: 'CASCADE'
      })
    }
  }
  Ticket.init({
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: "CASCADE"
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: "CASCADE"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    checkIn: {
      allowNull: true,
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    checkOut: {
      allowNull: true,
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Statuses',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};