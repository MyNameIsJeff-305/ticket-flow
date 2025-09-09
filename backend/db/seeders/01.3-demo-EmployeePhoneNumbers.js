'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { EmployeePhoneNumber } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await EmployeePhoneNumber.bulkCreate([
      {
        employeeId: 1,
        name: 'Office',
        phoneNumber: '123-456-7890'
      },
      {
        employeeId: 1,
        name: 'Home',
        phoneNumber: '987-654-3210'
      },
      {
        employeeId: 2,
        name: 'Mobile',
        phoneNumber: '555-555-5555'
      },
      {
        employeeId: 3,
        name: 'Personal',
        phoneNumber: '444-444-4444'
      },
      {
        employeeId: 4,
        name: 'Work',
        phoneNumber: '333-333-3333'
      },
      {
        employeeId: 4,
        name: 'Home',
        phoneNumber: '987-654-3210'
      },
      {
        employeeId: 4,
        name: 'Mobile',
        phoneNumber: '555-555-5555'
      },
      {
        employeeId: 6,
        name: 'Personal',
        phoneNumber: '444-444-4444'
      },
      {
        employeeId: 6,
        name: 'Work',
        phoneNumber: '333-333-3333'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EmployeePhoneNumbers';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
