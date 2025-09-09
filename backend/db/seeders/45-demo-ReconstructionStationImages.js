'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { ReconstructionStationImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReconstructionStationImage.bulkCreate([
      {
        reconstructionStationId: 1,
        imageUrl: 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',
        description: 'Image 1 description'
      },
      {
        reconstructionStationId: 2,
        imageUrl: 'https://www.hindustantimes.com/ht-img/img/2025/07/04/1600x900/computers_under_Rs_10000_1751609751440_1751609762564.png',
        description: 'Image 2 description'
      },
      {
        reconstructionStationId: 2,
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg',
        description: 'Image 3 description'
      },
      {
        reconstructionStationId: 3,
        imageUrl: 'https://m.media-amazon.com/images/I/81wMphFEQhL._UF894,1000_QL80_.jpg',
        description: 'Image 4 description'
      },
      {
        reconstructionStationId: 4,
        imageUrl: 'https://soeithelp.stanford.edu/sites/g/files/sbiybj26301/files/styles/breakpoint_2xl_2x/public/media/image/new_computer_setup_0.jpeg',
        description: 'Image 5 description'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReconstructionStationImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
