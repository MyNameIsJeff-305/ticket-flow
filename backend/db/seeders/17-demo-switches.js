'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Switch } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    Switch.bulkCreate([
      {
        assessmentId: 1,
        name: 'Switch 1',
        brand: 'Cisco',
        model: 'Catalyst 9300',
        ports: 48,
        poE: true,
        location: 'Data Center 1'
      },
      {
        assessmentId: 1,
        name: 'Switch 2',
        brand: 'Juniper',
        model: 'EX4300',
        ports: 24,
        poE: false,
        location: 'Data Center 1'
      },
      {
        assessmentId: 2,
        name: 'Switch 3',
        brand: 'Arista',
        model: '7280R',
        ports: 32,
        poE: true,
        location: 'Data Center 2'
      },
      {
        assessmentId: 3,
        name: 'Switch 4',
        brand: 'Cisco',
        model: 'Nexus 9000',
        ports: 48,
        poE: false,
        location: 'Data Center 2'
      },
      {
        assessmentId: 3,
        name: 'Switch 4',
        brand: 'Cisco',
        model: 'Nexus 9000',
        ports: 48,
        poE: false,
        location: 'Data Center 2'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Switches';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
