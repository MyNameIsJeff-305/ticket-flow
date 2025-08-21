'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PaymentTerminalImage } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await PaymentTerminalImage.bulkCreate([
      {
        paymentTerminalId: 1,
        imageUrl: 'https://shop.emerchantauthority.com/cdn/shop/products/Vx820.jpg',
        description: 'Front Desk Terminal'
      },
      {
        paymentTerminalId: 2,
        imageUrl: 'https://shop.emerchantauthority.com/cdn/shop/products/ict250-N.jpg',
        description: 'Back Office Terminal'
      },
      {
        paymentTerminalId: 2,
        imageUrl: 'https://cdn.weasy.io/users/retailmerchantservices/other/ingenico-ict250-card-machine.jpg',
        description: 'Warehouse Terminal'
      },
      {
        paymentTerminalId: 3,
        imageUrl: 'https://m.media-amazon.com/images/I/510QlTxWtkL.jpg',
        description: 'Warehouse Terminal'
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PaymentTerminalImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
