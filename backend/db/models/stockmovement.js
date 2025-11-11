'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockMovement extends Model {
    static associate(models) {
      StockMovement.belongsTo(models.Part, {
        foreignKey: 'partId',
        onDelete: 'CASCADE'
      });
      StockMovement.belongsTo(models.InventoryLocation, {
        foreignKey: 'inventoryLocationId',
        onDelete: 'CASCADE'
      });
      StockMovement.belongsTo(models.User, {
        foreignKey: 'employeeId',
        onDelete: 'CASCADE'
      });
    }
  }
  StockMovement.init({
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
    type: { 
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'IN, OUT, ADJUST, RESERVE, RELEASE'
    },
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Always positive, sign determined by type'
    },
    reason: { 
      type: DataTypes.STRING(200)
    },
    sourceType: { 
      type: DataTypes.STRING(30), //Ticket, PurchaseOrder, Manual
      allowNull: false
    },
    sourceId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employeeId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'StockMovement',
  });
  return StockMovement;
};