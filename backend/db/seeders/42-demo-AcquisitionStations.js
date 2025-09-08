'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { AcquisitionStation } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await AcquisitionStation.bulkCreate([
      {
        panoramicId: 1,
        brand: 'Brand A',
        model: 'Model A',
        iPAddress: '192.168.1.1',
        iPType: 'Static'
      },
      {
        panoramicId: 4,
        brand: 'Brand B',
        model: 'Model B',
        iPAddress: '192.168.1.2',
        iPType: 'DHCP'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'AcquisitionStations';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
