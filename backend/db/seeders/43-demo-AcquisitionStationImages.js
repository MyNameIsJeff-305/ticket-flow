'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { AcquisitionStationImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    AcquisitionStationImage.bulkCreate([
      {
        acquisitionStationId: 1,
        imageUrl: 'https://homefordentalcare.com/wp-content/uploads/2020/09/PE7M0ix5-scaled-560x330-1-2.jpg',
        description: 'Image 1 description'
      },
      {
        acquisitionStationId: 1,
        imageUrl: 'https://www.collinsdentalequipment.com/wp-content/uploads/2023/10/s-l1600-343-768x513.webp',
        description: 'Image 2 description'
      },
      {
        acquisitionStationId: 2,
        imageUrl: 'https://www.planetdds.com/wp-content/uploads/2024/08/Apteryx-Denticon-Integration-1024x521.png',
        description: 'Image 3 description'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'AcquisitionStationImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
