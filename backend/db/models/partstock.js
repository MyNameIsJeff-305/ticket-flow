'use strict';
module.exports = (sequelize, DataTypes) => {
    const PartStock = sequelize.define('PartStock', {
        partId: { type: DataTypes.INTEGER, allowNull: false },
        inventoryLocationId: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        minThreshold: { type: DataTypes.INTEGER, defaultValue: 0 }
    }, { tableName: 'PartStock' });

    PartStock.associate = models => {
        PartStock.belongsTo(models.Part, { foreignKey: 'partId', as: 'part' });
        PartStock.belongsTo(models.InventoryLocation, { foreignKey: 'inventoryLocationId', as: 'location' });
    };

    return PartStock;
};
