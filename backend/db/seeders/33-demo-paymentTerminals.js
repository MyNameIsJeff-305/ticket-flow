'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PaymentTerminal } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await PaymentTerminal.bulkCreate([
      {
        assessmentId: 1,
        brand: 'Verifone',
        model: 'VX 820',
        iPAddress: '192.168.1.100',
        iPType: 'Static',
        location: 'Front Desk'
      },
      {
        assessmentId: 1,
        brand: 'Ingenico',
        model: 'iCT250',
        iPAddress: '192.168.1.101',
        iPType: 'Dynamic',
        location: 'Back Office'
      },
      {
        assessmentId: 1,
        brand: 'PAX',
        model: 'A920',
        iPAddress: '192.168.1.102',
        iPType: 'Static',
        location: 'Warehouse'
      },
      {
        assessmentId: 1,
        brand: 'Verifone',
        model: 'VX 820',
        iPAddress: '192.168.1.100',
        iPType: 'Static',
        location: 'Front Desk'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PaymentTerminals';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
