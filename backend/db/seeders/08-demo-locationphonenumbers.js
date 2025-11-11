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
        phoneNumber: '+11234567890',
        phoneType: 'Office'
      },
      {
        locationId: 1,
        phoneNumber: '+15555556789',
        phoneType: 'Fax'
      },
      {
        locationId: 2,
        phoneNumber: '+15555876543',
        phoneType: 'Office'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'LocationPhoneNumbers';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
