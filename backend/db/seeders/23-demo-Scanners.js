'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Scanner } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    Scanner.bulkCreate([
      {
        assessmentId: 1,
        iPAddress: '192.168.1.1',
        iPType: "Static",
        brand: 'HP',
        model: 'LaserJet Pro',
        connection: 'Wired',
        location: 'Office'
      },
      {
        assessmentId: 2,
        iPAddress: '192.168.1.2',
        iPType: "DHCP",
        brand: 'Canon',
        model: 'imageCLASS',
        connection: 'Bluetooth',
        location: 'Office'
      },
      {
        assessmentId: 3,
        iPAddress: '192.168.1.3',
        iPType: "Static",
        brand: 'Epson',
        model: 'EcoTank',
        connection: 'USB',
        location: 'Office'
      },
      {
        assessmentId: 1,
        iPAddress: '192.168.1.4',
        iPType: "DHCP",
        brand: 'Brother',
        model: 'MFC-L3770CDW',
        connection: 'Wireless',
        location: 'Office'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Scanners';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
