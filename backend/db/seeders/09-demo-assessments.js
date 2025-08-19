'use strict';

const { Assessment } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    Assessment.bulkCreate([
      {
        name: "Assessment-1",
        locationId: 1
      },
      {
        name: "Assessment-2",
        locationId: 2
      },
      {
        name: "Assessment-3",
        locationId: 1
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Assessments';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
