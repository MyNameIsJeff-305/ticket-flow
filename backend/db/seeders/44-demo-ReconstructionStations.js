'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { ReconstructionStation } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReconstructionStation.bulkCreate([
      {
        panoramicId: 1,
        brand: 'Brand A',
        model: 'Model A',
        iPAddress: '192.168.1.1',
        iPType: 'static'
      },
      {
        panoramicId: 1,
        brand: 'Brand B',
        model: 'Model B',
        iPAddress: '192.168.1.2',
        iPType: 'dynamic'
      },
      {
        panoramicId: 2,
        brand: 'Brand C',
        model: 'Model C',
        iPAddress: '192.168.1.3',
        iPType: 'static'
      },
      {
        panoramicId: 4,
        brand: 'Brand A',
        model: 'Model A',
        iPAddress: '192.168.1.1',
        iPType: 'static'
      },
      {
        panoramicId: 4,
        brand: 'Brand B',
        model: 'Model B',
        iPAddress: '192.168.1.2',
        iPType: 'dynamic'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReconstructionStations';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
