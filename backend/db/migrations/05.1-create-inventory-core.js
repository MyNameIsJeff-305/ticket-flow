let options1 = {};
let options2 = {};
let options3 = {};

if (process.env.NODE_ENV === 'production') {
    options1.schema = process.env.SCHEMA;
    options2.schema = process.env.SCHEMA;
    options3.schema = process.env.SCHEMA;
}

module.exports = {
    async up(queryInterface, Sequelize) {
        // 1) Ubicaciones
        await queryInterface.createTable('InventoryLocations', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING(100), allowNull: false },
            description: { type: Sequelize.STRING(255) },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        }, options1);

        // 2) Stock por pieza/ubicación
        await queryInterface.createTable('PartStock', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            partId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Parts', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'CASCADE'
            },
            inventoryLocationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'InventoryLocations', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'CASCADE'
            },
            quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
            minThreshold: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        }, options2);
        await queryInterface.addConstraint('PartStock', {
            fields: ['partId', 'inventoryLocationId'],
            type: 'unique',
            name: 'uniq_part_stock_part_location'
        });

        // 3) Movimientos de stock
        await queryInterface.createTable('StockMovements', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            partId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Parts', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'RESTRICT'
            },
            inventoryLocationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'InventoryLocations', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'RESTRICT'
            },
            type: { type: Sequelize.STRING(20), allowNull: false, comment: 'IN, OUT, ADJUST, RESERVE, RELEASE' },
            quantity: { type: Sequelize.INTEGER, allowNull: false, comment: 'Siempre positivo; el signo lo define type' },
            reason: { type: Sequelize.STRING(200) },
            sourceType: { type: Sequelize.STRING(30) }, // Ticket, PurchaseOrder, Manual
            sourceId: { type: Sequelize.INTEGER },
            employeeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'Employees', key: 'id' },
                onUpdate: 'SET NULL', onDelete: 'SET NULL'
            },
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
        }, options3);
    },

    async down(queryInterface) {
        options1.tableName = 'InventoryLocations';
        options2.tableName = 'PartStock';
        options3.tableName = 'StockMovements';
        await queryInterface.dropTable(options3);
        await queryInterface.dropTable(options2);
        await queryInterface.dropTable(options1);
    }
};
