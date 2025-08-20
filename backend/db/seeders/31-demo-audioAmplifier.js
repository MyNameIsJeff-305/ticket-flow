'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { audioAmplifier } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await audioAmplifier.bulkCreate([
      {
        assessmentId: 1,
        brand: 'Yamaha',
        model: 'MXA910',
        serialNumber: '123456789',
        location: 'Room 101'
      },
      {
        assessmentId: 1,
        brand: 'QSC',
        model: 'AD-S6T',
        serialNumber: '987654321',
        location: 'Room 102'
      },
      {
        assessmentId: 2,
        brand: 'Bose',
        model: 'FreeSpace DS 16F',
        serialNumber: '456789123',
        location: 'Room 103'
      },
      {
        assessmentId: 3,
        brand: 'Sony',
        model: 'ICD-UX570',
        serialNumber: '321654987',
        location: 'Room 104'
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'audioAmplifiers';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
