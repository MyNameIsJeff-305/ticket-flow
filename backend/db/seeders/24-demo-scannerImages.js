'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { ScannerImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    ScannerImage.bulkCreate([
      {
        scannerId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/61XB+TikfjL.jpg',
        description: 'Scanner 1 Image'
      },
      {
        scannerId: 3,
        imageUrl: 'https://m.media-amazon.com/images/I/61XB+TikfjL.jpg',
        description: 'Scanner 2 Image'
      },
      {
        scannerId: 1,
        imageUrl: 'https://www.hp.com/content/dam/sites/worldwide/printers/scanners/n-4000-snw-1-img@2x.jpg',
        description: 'Scanner 3 Image'
      },
      {
        scannerId: 4,
        imageUrl: 'https://m.media-amazon.com/images/I/61XB+TikfjL.jpg',
        description: 'Scanner 4 Image'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ScannerImages';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
