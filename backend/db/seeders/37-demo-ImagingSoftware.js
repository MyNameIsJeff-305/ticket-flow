'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { ImagingSoftware } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await ImagingSoftware.bulkCreate([
      {
        dentalPracticeInformation: 1,
        name: 'Dexis',
        servername: 'server1',
        iPAddress: '192.168.1.1',
        iPType: 'Static'
      },
      {
        dentalPracticeInformation: 1,
        name: 'Dentrix',
        servername: 'server2',
        iPAddress: '192.168.1.2',
        iPType: 'DHCP'
      },
      {
        dentalPracticeInformation: 2,
        name: 'Carestream',
        servername: 'server1',
        iPAddress: '192.168.1.1',
        iPType: 'Static'
      },
      {
        dentalPracticeInformation: 3,
        name: 'Sidexis',
        servername: 'server2',
        iPAddress: '192.168.1.2',
        iPType: 'DHCP'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ImagingSoftwares';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
