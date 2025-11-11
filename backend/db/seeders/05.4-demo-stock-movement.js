let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { StockMovement } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await StockMovement.bulkCreate([
      {
        partId: 1,
        inventoryLocationId: 1,
        quantity: -5,
        type: 'out',
        sourceType: 'Ticket',
        sourceId: 101,
        employeeId: 1
      },
      {
        partId: 1,
        inventoryLocationId: 2,
        quantity: 10,
        type: 'in',
        sourceType: 'PurchaseOrder',
        sourceId: 201,
        employeeId: 2
      },
      {
        partId: 2,
        inventoryLocationId: 1,
        quantity: -3,
        type: 'out',
        sourceType: 'Manual',
        sourceId: 301,
        employeeId: 1
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'StockMovements';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('StockMovements', {
      sourceId: {
        [Op.in]: [101, 201, 301]
      }
    }, options);
  }
};
