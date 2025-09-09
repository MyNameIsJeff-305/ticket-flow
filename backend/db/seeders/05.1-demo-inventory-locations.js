let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

const { InventoryLocation } = require('@db/models');

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('InventoryLocations', [
            { name: 'Main Warehouse', description: 'Primary storage', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Van #1', description: 'Field technician van', createdAt: new Date(), updatedAt: new Date() }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('InventoryLocations', null, {});
    }
};