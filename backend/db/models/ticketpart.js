'use strict';
module.exports = (sequelize, DataTypes) => {
    const TicketPart = sequelize.define('TicketPart', {
        ticketId: { type: DataTypes.INTEGER, allowNull: false },
        partId: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        unitPrice: DataTypes.DECIMAL(10, 2),
        status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'requested' },
        inventoryLocationId: DataTypes.INTEGER,
        notes: DataTypes.STRING(255)
    }, { tableName: 'TicketParts' });

    TicketPart.associate = models => {
        TicketPart.belongsTo(models.Ticket, { foreignKey: 'ticketId', as: 'ticket' });
        TicketPart.belongsTo(models.Part, { foreignKey: 'partId', as: 'part' });
        TicketPart.belongsTo(models.InventoryLocation, { foreignKey: 'inventoryLocationId', as: 'location' });
    };

    return TicketPart;
};
