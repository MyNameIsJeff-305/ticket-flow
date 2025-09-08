'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { ManagementSoftware } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await ManagementSoftware.bulkCreate([
      {
        dentalPracticeInformationId: 1,
        name: 'Open Dental',
        servername: 'server-a',
        iPAddress: '192.168.1.1',
        iPType: 'Static'
      },
      {
        dentalPracticeInformationId: 2,
        name: 'Eaglesoft',
        servername: 'server-b',
        iPAddress: '192.168.1.2',
        iPType: 'DHCP'
      },
      {
        dentalPracticeInformationId: 3,
        name: 'EagleSoft',
        servername: 'Main-Server',
        iPAddress: '192.168.1.3',
        iPType: 'Static'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ManagementSoftwares';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
