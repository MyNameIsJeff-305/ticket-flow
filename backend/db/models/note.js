'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      Note.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        onDelete: 'CASCADE'
      })
    }
  }
  Note.init({
    note: {
      type: DataTypes.STRING(255)
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tickets',
        key: 'id'
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};