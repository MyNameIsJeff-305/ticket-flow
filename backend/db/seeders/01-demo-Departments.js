'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Department } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await Department.bulkCreate([
      {
        name: 'HR',
        description: 'Human Resources'
      },
      {
        name: 'Engineering',
        description: 'Software Engineering'
      },
      {
        name: 'Sales',
        description: 'Sales and Marketing'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Departments';
    return queryInterface.bulkDelete(options);
  }
};
