'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { cctvImages } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await cctvImages.bulkCreate([
      {
        cctvId: 1,
        imageUrl: 'https://i.ebayimg.com/images/g/bFMAAOSwUsFhvKKJ/s-l1200.jpg',
        description: 'Main Entrance Camera - Image 1'
      },
      {
        cctvId: 1,
        imageUrl: 'https://cdn11.bigcommerce.com/s-zbabt7ht4y/images/stencil/1280x1280/products/63319/105795/hikvision-ds-7604ni-q14p-8tb-b7b6b72c-b757__81768.1705575553.jpg',
        description: 'Main Entrance Camera - Image 2'
      },
      {
        cctvId: 2,
        imageUrl: 'https://usacompua.com/cdn/shop/files/97b407_de60f3ff53094049a041eb3d71d91fb5_mv2.jpg',
        description: 'Server Room Camera - Image 1'
      },
      {
        cctvId: 3,
        imageUrl: 'https://deluxecctv.com/wp-content/uploads/2023/06/NVR4832-16P-4K-Main.jpg',
        description: 'Server Room Camera - Image 2'
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'cctvImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
