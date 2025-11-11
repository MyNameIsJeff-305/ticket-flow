'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Server } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Server.bulkCreate([
      {
        assessmentId: 1,
        name: "Main Server",
        brand: 'Dell',
        model: 'PowerEdge R740',
        user: null,
        password: null,
        notProvided: 'no',
        ipAddress: '192.168.1.10',
        iPType: 'static',
        tagNumber: 'TAG-001',
        serialNumber: 'SN-001',
        macAddress: '00:1A:2B:3C:4D:5E',
        operativeSystem: 'Ubuntu 20.04',
        location: 'Data Center 1'
      },
      {
        assessmentId: 1,
        name: "Open Dental Server",
        brand: 'HP',
        model: 'ProLiant DL380',
        user: 'admin',
        password: 'password',
        notProvided: 'yes',
        ipAddress: '192.168.1.11',
        iPType: 'static',
        tagNumber: 'TAG-002',
        serialNumber: 'SN-002',
        macAddress: '00:1A:2B:3C:4D:5F',
        operativeSystem: 'CentOS 7',
        location: 'Data Center 1'
      },
      {
        assessmentId: 2,
        name: "Main",
        brand: 'Lenovo',
        model: 'ThinkSystem SR650',
        user: null,
        password: null,
        notProvided: 'no',
        ipAddress: '192.168.1.12',
        iPType: 'static',
        tagNumber: 'TAG-003',
        serialNumber: 'SN-003',
        macAddress: '00:1A:2B:3C:4D:5G',
        operativeSystem: 'Debian 10',
        location: 'Data Center 1'
      },
      {
        assessmentId: 3,
        name: "Main",
        brand: 'Lenovo',
        model: 'ThinkSystem SR650',
        user: null,
        password: null,
        notProvided: 'no',
        ipAddress: '192.168.1.12',
        iPType: 'static',
        tagNumber: 'TAG-003',
        serialNumber: 'SN-003',
        macAddress: '00:1A:2B:3C:4D:5G',
        operativeSystem: 'Debian 10',
        location: 'Data Center 1'
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Servers';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
