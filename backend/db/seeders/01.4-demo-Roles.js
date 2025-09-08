'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const {Role} = require('@db/models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await Role.bulkCreate([
      { name: 'Admin' },
      { name: 'Technician' },
      { name: 'Manager' },
      { name: 'Guest' }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Roles';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
