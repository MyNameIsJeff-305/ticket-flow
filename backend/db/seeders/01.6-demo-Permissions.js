'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Permission } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await Permission.bulkCreate([
      { name: 'CREATE_TICKET' },
      { name: 'VIEW_TICKET' },
      { name: 'UPDATE_TICKET' },
      { name: 'DELETE_TICKET' },
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Permissions';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
