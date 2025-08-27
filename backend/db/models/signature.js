'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Signature extends Model {
    static associate(models) {
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
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    signedBy: {
      type: DataTypes.ENUM,
      values: ['employee', 'client'],
      allowNull: false
    },
    signatureImageURL: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Signature',
    indexes: [
      {
        unique: true,
        fields: ["ticketId"],
      },
    ],
  });
  return Signature;
};