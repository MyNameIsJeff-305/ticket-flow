'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Signature extends Model {
    static associate(models) {
      Signature.belongsTo(models.Ticket, {
        foreignKey: "ticketId",
        onDelete: "CASCADE"
      })
    }
  }

  Signature.init({
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tickets",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    signedBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    signatureImageURL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Signature'
  });
  return Signature;
};