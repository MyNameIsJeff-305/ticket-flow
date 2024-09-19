'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    static associate(models) {
      Part.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
        onDelete: 'CASCADE'
      })
    }
  }
  Part.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tickets',
        key: 'id'
      }
    },
    imageUrl: {
      type: DataTypes.STRING(255),
    }
  }, {
    sequelize,
    modelName: 'Part',
  });
  return Part;
};