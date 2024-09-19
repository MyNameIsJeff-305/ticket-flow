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
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },
    ticketId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};