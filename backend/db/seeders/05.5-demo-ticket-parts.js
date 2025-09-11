let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { TicketPart } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await TicketPart.bulkCreate([
      {
        ticketId: 1,
        partId: 1,
        quantity: 2,
        unitPrice: 15.00,
        status: 'REQUESTED',
        inventoryLocationId: 1,
        notes: 'Urgent part needed'
      },
      {
        ticketId: 1,
        partId: 2,
        quantity: 1,
        unitPrice: 45.50,
        status: 'ORDERED',
        inventoryLocationId: 2,
        notes: 'Order placed, awaiting delivery'
      },
      {
        ticketId: 2,
        partId: 1,
        quantity: 3,
        unitPrice: 15.00,
        status: 'RECEIVED',
        inventoryLocationId: 1,
        notes: 'Part received and installed'
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'TicketParts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('TicketParts', {
      ticketId: {
        [Op.in]: [1, 2]
      }
    }, options);
  }
};
