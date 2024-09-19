'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      Status.hasMany(models.Ticket, {
        foreignKey: 'statusId',
        onDelete: 'CASCADE'
      })
    }
  }
  Status.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255)
    }
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};