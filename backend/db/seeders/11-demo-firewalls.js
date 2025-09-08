'use strict';

const { Firewall } = require('@db/models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Firewall.bulkCreate([
      {
        assessmentId: 1,
        brand: 'Cisco',
        model: 'ASA 5506-X',
        location: 'Debajo del bench',
      },
      {
        assessmentId: 2,
        brand: 'Fortinet',
        model: 'FortiGate 60F',
        location: 'Al lado del router',
      },
      {
        assessmentId: 3,
        brand: 'Palo Alto',
        model: 'PA-220',
        location: 'Oficina principal',
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Firewalls';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};