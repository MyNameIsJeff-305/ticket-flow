'use strict';
module.exports = (sequelize, DataTypes) => {
    const StockMovement = sequelize.define('StockMovement', {
        partId: { type: DataTypes.INTEGER, allowNull: false },
        inventoryLocationId: { type: DataTypes.INTEGER, allowNull: false },
        type: { type: DataTypes.STRING(20), allowNull: false }, // IN, OUT, ADJUST, RESERVE, RELEASE
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        reason: DataTypes.STRING(200),
        sourceType: DataTypes.STRING(30), // Ticket, PurchaseOrder, Manual
        sourceId: DataTypes.INTEGER,
        employeeId: DataTypes.INTEGER
    }, { tableName: 'StockMovements', timestamps: true, createdAt: 'createdAt', updatedAt: false });

    StockMovement.associate = models => {
        StockMovement.belongsTo(models.Part, { foreignKey: 'partId', as: 'part' });
        StockMovement.belongsTo(models.InventoryLocation, { foreignKey: 'inventoryLocationId', as: 'location' });
        StockMovement.belongsTo(models.User, { foreignKey: 'userId', as: 'employee' });
    };

    return StockMovement;
};
