'use strict';
module.exports = (sequelize, DataTypes) => {
    const InventoryLocation = sequelize.define('InventoryLocation', {
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: DataTypes.STRING(255)
    }, { tableName: 'InventoryLocations' });

    InventoryLocation.associate = models => {
        InventoryLocation.hasMany(models.PartStock, { foreignKey: 'inventoryLocationId', as: 'stocks' });
        InventoryLocation.hasMany(models.StockMovement, { foreignKey: 'inventoryLocationId', as: 'movements' });
        InventoryLocation.hasMany(models.TicketPart, { foreignKey: 'inventoryLocationId', as: 'ticketParts' });
    };

    return InventoryLocation;
};
