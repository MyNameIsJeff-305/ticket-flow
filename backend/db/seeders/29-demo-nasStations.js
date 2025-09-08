'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { nasStation } = require('@db/models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await nasStation.bulkCreate([
      {
        assessmentId: 1,
        brand: 'Synology',
        model: 'DS220+',
        serialNumber: '123456789',
        storage: '2TB',
        bays: 2,
        iPAddress: '192.168.1.100',
        iPType: 'Static',
        location: 'Server Room'
      },
      {
        assessmentId: 1,
        brand: 'QNAP',
        model: 'TS-451+',
        serialNumber: '987654321',
        storage: '4TB',
        bays: 4,
        iPAddress: '192.168.1.101',
        iPType: 'DHCP',
        location: 'Server Room'
      },
      {
        assessmentId: 3,
        brand: 'Western Digital',
        model: 'My Cloud Home',
        serialNumber: '192837465',
        storage: '8TB',
        bays: 1,
        iPAddress: '192.168.1.102',
        iPType: 'Static',
        location: 'Server Room'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'nasStations';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
