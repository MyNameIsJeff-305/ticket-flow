'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { DentalPracticeInformation } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await DentalPracticeInformation.bulkCreate([
      {
        name: 'Dental Practice 1',
        assessmentId: 1,
        description: 'Description for Dental Practice 1'
      },
      {
        name: 'Dental Practice 2',
        assessmentId: 2,
        description: 'Description for Dental Practice 2'
      },
      {
        name: 'Dental Practice 3',
        assessmentId: 3,
        description: 'Description for Dental Practice 3'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'DentalPracticeInformations';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
