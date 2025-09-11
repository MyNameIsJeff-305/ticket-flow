'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryLocation extends Model {
    static associate(models) {
      InventoryLocation.hasMany(models.PartStock, {
        foreignKey: 'inventoryLocationId',
        onDelete: 'CASCADE'
      });
      InventoryLocation.hasMany(models.StockMovement, {
        foreignKey: 'inventoryLocationId',
        onDelete: 'CASCADE'
      });
    }
  }
  InventoryLocation.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'InventoryLocation',
  });
  return InventoryLocation;
};