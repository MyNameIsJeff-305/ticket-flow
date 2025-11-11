let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PartStock } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await PartStock.bulkCreate([
      {
        partId: 1,
        inventoryLocationId: 1,
        quantity: 50,
        minThreshold: 10
      },
      {
        partId: 1,
        inventoryLocationId: 2,
        quantity: 20,
        minThreshold: 5
      },
      {
        partId: 2,
        inventoryLocationId: 1,
        quantity: 15,
        minThreshold: 3
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PartStocks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('PartStocks', {
      partId: {
        [Op.in]: [1, 2]
      }
    }, options);
  }
};
