'use strict';

const { LocationPhoneNumber } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await LocationPhoneNumber.bulkCreate([
      {
        locationId: 1,
        phoneNumber: '555-1234',
        phoneType: 'Office'
      },
      {
        locationId: 1,
        phoneNumber: '555-5678',
        phoneType: 'Fax'
      },
      {
        locationId: 2,
        phoneNumber: '555-8765',
        phoneType: 'Office'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'LocationPhoneNumbers';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
