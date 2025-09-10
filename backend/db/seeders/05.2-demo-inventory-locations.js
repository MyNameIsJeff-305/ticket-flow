let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { InventoryLocation } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await InventoryLocation.bulkCreate([
      {
        name: 'Warehouse A',
        description: 'Main warehouse located in the city center.'
      },
      {
        name: 'Local Office',
        description: 'Storage at the local office building.'
      },
      {
        name: 'Van #1',
        description: 'Delivery van for local deliveries.'
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'InventoryLocations';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('InventoryLocations', {
      name: {
        [Op.in]: ['Warehouse A', 'Local Office', 'Van #1']
      }
    }, options);
  }
};
