'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const {RolePermission} = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await RolePermission.bulkCreate([
      { roleId: 1, permissionId: 1 },
      { roleId: 1, permissionId: 2 },
      { roleId: 2, permissionId: 1 },
      { roleId: 2, permissionId: 3 },
      { roleId: 3, permissionId: 2 },
      { roleId: 4, permissionId: 1 },
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'RolePermissions';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
