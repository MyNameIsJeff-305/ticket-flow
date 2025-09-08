let options1 = {};

if (process.env.NODE_ENV === 'production') {
    options1.schema = process.env.SCHEMA;
}

module.exports = {
    async up(queryInterface, Sequelize) {
        // Renombrar tabla antigua Parts -> TicketParts_legacy (solo si existe)
        const tables = await queryInterface.showAllTables();
        if (tables.includes('Parts')) {
            // Detecta si la tabla Parts ya existe pero es la del catálogo recién creada (tiene columna 'sku')
            const desc = await queryInterface.describeTable('Parts').catch(() => ({}));
            if (!('sku' in desc)) {
                await queryInterface.renameTable('Parts', 'TicketParts_legacy');
            }
        }

        // Crear nueva TicketParts (líneas por ticket)
        await queryInterface.createTable('TicketParts', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            ticketId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Tickets', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'CASCADE'
            },
            partId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Parts', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'RESTRICT'
            },
            quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
            unitPrice: { type: Sequelize.DECIMAL(10, 2) },
            status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'requested' }, // requested, picked, installed, returned
            inventoryLocationId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'InventoryLocations', key: 'id' },
                onUpdate: 'SET NULL', onDelete: 'SET NULL'
            },
            notes: { type: Sequelize.STRING(255) },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        }, options1);
    },

    async down(queryInterface) {
        options1.tableName = 'TicketParts';
        await queryInterface.dropTable(options1);

        // Si renombramos, podemos revertir el nombre
        const tables = await queryInterface.showAllTables();
        if (tables.includes('TicketParts_legacy')) {
            await queryInterface.renameTable('TicketParts_legacy', 'Parts');
        }
    }
};
