'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Station } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Station.bulkCreate([
      {
        assessmentId: 3,
        stationName: 'Station 1',
        brand: 'DELL',
        model: 'Optiflex 7020',
        formFactor: 'Desktop',
        iPAddress: '192.168.1.10',
        iPType: "Static",
        location: 'Office'
      },
      {
        assessmentId: 1,
        stationName: 'Station 2',
        brand: 'HP',
        model: 'Elite',
        formFactor: 'All-In-One',
        iPAddress: '192.168.1.11',
        iPType: "DHCP",
        location: 'Office'
      },
      {
        assessmentId: 2,
        stationName: 'Station 3',
        brand: 'Lenovo',
        model: 'Thinkpad',
        formFactor: 'Micro Station',
        iPAddress: '192.168.1.12',
        iPType: "Static",
        location: 'Office'
      },
      {
        assessmentId: 2,
        stationName: 'Station 4',
        brand: 'ASUS',
        model: 'ROG',
        formFactor: 'Mini Station',
        iPAddress: '192.168.1.13',
        iPType: "DHCP",
        location: 'Office'
      },
      {
        assessmentId: 3,
        stationName: 'Station 5',
        brand: 'Apple',
        model: 'iMac',
        formFactor: 'All-In-One',
        iPAddress: '192.168.1.14',
        iPType: "Static",
        location: 'Office'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Stations';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
