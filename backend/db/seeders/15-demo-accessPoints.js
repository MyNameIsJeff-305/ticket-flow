'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { AccessPoint } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    AccessPoint.bulkCreate([
      {
        assessmentId: 1,
        brand: 'Cisco',
        model: 'Aironet 2800',
        location: 'Office'
      },
      {
        assessmentId: 3,
        brand: 'Aruba',
        model: 'AP-515',
        location: 'Office'
      },
      {
        assessmentId: 3,
        brand: 'Ubiquiti',
        model: 'UniFi 6 Lite',
        location: 'Warehouse'
      },
      {
        assessmentId: 3,
        brand: 'TP-Link',
        model: 'EAP245',
        location: 'Warehouse'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'AccessPoints';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
