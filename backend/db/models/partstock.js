'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartStock extends Model {
    static associate(models) {
      PartStock.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE'
      });
      PartStock.belongsTo(models.InventoryLocation, {
        foreignKey: 'inventoryLocationId',
        onDelete: 'CASCADE'
      });
    }
  }
  PartStock.init({
    partId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parts',
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    minThreshold: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'PartStock',
  });
  return PartStock;
};