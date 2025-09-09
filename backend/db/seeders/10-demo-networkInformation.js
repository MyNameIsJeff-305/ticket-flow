'use strict';

const { NetworkInformation } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await NetworkInformation.bulkCreate([
      {
        assessmentId: 1,
        internetServiceProvider: 'AT&T',
        publicIP: '192.168.1.1',
        hasStaticIP: 'yes',
        staticIP: '96.42.123.1',
        subnet: '255.255.255.0',
        gateway: '192.168.1.254',
      },
      {
        assessmentId: 2,
        internetServiceProvider: 'Verizon',
        publicIP: '192.168.2.1',
        hasStaticIP: 'no',
        staticIP: null,
        subnet: null,
        gateway: null,
      },
      {
        assessmentId: 3,
        internetServiceProvider: 'Comcast',
        publicIP: '76.45.45.64',
        hasStaticIP: 'unknown',
        staticIP: null,
        subnet: null,
        gateway: null,
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'NetworkInformations';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
