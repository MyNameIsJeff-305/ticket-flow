'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { AccessPointImage } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    AccessPointImage.bulkCreate([
      {
        accessPointId: 1,
        imageUrl: 'https://cdn.cs.1worldsync.com/df/33/df338184-a270-4409-8e10-991ca62242d0.jpg',
        description: 'Image 1 description'
      },
      {
        accessPointId: 1,
        imageUrl: 'https://www.allhdd.com/wp-content/uploads/2024/07/products-AIR-AP2802E-B-K9C-Cisco-5.2GBPS-Wireless-Access-Point.jpg',
        description: 'Image 2 description'
      },
      {
        accessPointId: 2,
        imageUrl: 'https://i.ebayimg.com/images/g/piEAAOSwSPRkFKk0/s-l1200.jpg',
        description: 'Image 3 description'
      },
      {
        accessPointId: 4,
        imageUrl: 'https://m.media-amazon.com/images/I/41Ap8CFqPFL.jpg',
        description: 'Image 4 description'
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'AccessPointImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
