'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketEmployee extends Model {
    static associate(models) {
      TicketEmployee.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        onDelete: 'CASCADE'
      });
      TicketEmployee.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  TicketEmployee.init({
    ticketId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tickets',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'TicketEmployee',
  });
  return TicketEmployee;
};