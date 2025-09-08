'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { StationImage } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await StationImage.bulkCreate([
      {
        stationId: 1,
        imageUrl: 'https://service.pcconnection.com/images/inhouse/53702ABE-D418-4DC2-8A8C-6F20EB864A1B.jpg',
        description: 'Image 1 description'
      },
      {
        stationId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/81iyD5MWARL.jpg',
        description: 'Image 2 description'
      },
      {
        stationId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/41nkMg7zmOL.jpg',
        description: 'Image 3 description'
      },
      {
        stationId: 3,
        imageUrl: 'https://p2-ofp.static.pub/fes/cms/2022/03/15/a8kjnh0qazb7vr8dxw6tuilmp40mvo191399.jpg',
        description: 'Image 3 description'
      },
      {
        stationId: 4,
        imageUrl: 'https://static-media.laptopoutlet.co.uk/catalog/product/c/b/cb97beb5f7167d62389109a933382840.jpg',
        description: 'Image 3 description'
      },
      {
        stationId: 5,
        imageUrl: 'https://cdn.cs.1worldsync.com/81/06/81064c28-a569-4dd9-b4a3-c6b2fff5c883.jpg',
        description: 'Image 3 description'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'StationImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
