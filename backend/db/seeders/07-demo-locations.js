'use strict';

const {Location} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Location.bulkCreate([
      {
        name: 'Location 1',
        clientId: 1,
        addressLine1: '123 Main St',
        addressLine2: 'Suite 100',
        city: 'Anytown',
        state: 'CA',
        zipcode: 12345
      },
      {
        name: 'Location 2',
        clientId: 1,
        addressLine1: '456 Elm St',
        addressLine2: null,
        city: 'Othertown',
        state: 'CA',
        zipcode: 67890
      },
      {
        name: 'Location 3',
        clientId: 2,
        addressLine1: '789 Oak St',
        addressLine2: null,
        city: 'Sometown',
        state: 'CA',
        zipcode: 13579
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Locations';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
