'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { IPPhone } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await IPPhone.bulkCreate([
      {
        assessmentId: 1,
        brand: 'Cisco',
        model: 'CP-8841',
        iPAddress: '192.168.1.10',
        iPType: true,
        location: 'Office'
      },
      {
        assessmentId: 1,
        brand: 'Avaya',
        model: '9608',
        iPAddress: '192.168.1.11',
        iPType: false,
        location: 'Main'
      },
      {
        assessmentId: 2,
        brand: 'Polycom',
        model: 'VVX 411',
        iPAddress: '192.168.1.12',
        iPType: true,
        location: 'Office-2'
      },
      {
        assessmentId: 3,
        brand: 'Cisco',
        model: 'CP-8845',
        iPAddress: '192.168.1.13',
        iPType: false,
        location: 'OP-1'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'IPPhones';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
