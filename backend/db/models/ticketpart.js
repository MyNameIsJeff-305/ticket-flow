'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketPart extends Model {
    static associate(models) {
      
    }
  }
  TicketPart.init({
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tickets',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    partId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parts',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2)
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'REQUESTED',
      comment: 'PENDING, ORDERED, RECEIVED, CANCELED'
    },
    inventoryLocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'InventoryLocations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    notes: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'TicketPart',
  });
  return TicketPart;
};