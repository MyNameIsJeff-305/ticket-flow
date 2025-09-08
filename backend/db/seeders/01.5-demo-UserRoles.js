'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { UserRole } = require('@db/models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await UserRole.bulkCreate([
      { userId: 1, roleId: 2 },
      { userId: 2, roleId: 1 },
      { userId: 3, roleId: 2 },
      { userId: 4, roleId: 3 },
      { userId: 5, roleId: 3 },
      { userId: 6, roleId: 2 }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserRoles';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
