'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { SwitchImage } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await SwitchImage.bulkCreate([
      {
        switchId: 1,
        imageUrl: 'https://www.tritondatacom.com/cdn/shop/files/C9300-48P-E-10-front.png',
        description: 'Front view of Switch 1'
      },
      {
        switchId: 1,
        imageUrl: 'https://www.tonitrus.com/media/image/product/507869/md/c9300-48u-e_2~3.jpg',
        description: 'Back view of Switch 1'
      },
      {
        switchId: 2,
        imageUrl: 'https://dedicatednetworksinc.com/wp-content/uploads/2018/11/EX4300-48P-front.png',
        description: 'Front view of Switch 2'
      },
      {
        switchId: 3,
        imageUrl: 'https://cdn11.bigcommerce.com/s-e692hdujm7/images/stencil/1280x1280/products/8414/11553/DCS-7280TR-48C6-R__01321.1699389653.jpg',
        description: 'Front view of Switch 3'
      },
      {
        switchId: 4,
        imageUrl: 'https://netmode.com/wp-content/uploads/2021/05/N9K-C9332PQ.jpg',
        description: 'Front view of Switch 4'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SwitchImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
