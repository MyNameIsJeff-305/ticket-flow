'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { CCTV } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await CCTV.bulkCreate([
      {
        assessmentId: 1,
        type: 'NVR',
        brand: 'Hikvision',
        model: 'DS-2CD2143G0-I',
        location: 'Main Entrance'
      },
      {
        assessmentId: 1,
        type: 'DVR',
        brand: 'Dahua',
        model: 'DHI-DVR5216B-4',
        location: 'Server Room'
      },
      {
        assessmentId: 2,
        type: 'NVR',
        brand: 'Hikvision',
        model: 'DS-2CD2143G0-I',
        location: 'Server Room'
      },
      {
        assessmentId: 3,
        type: 'DVR',
        brand: 'Dahua',
        model: 'DHI-DVR5216B-4',
        location: 'Server Room'
      },
      {
        assessmentId: 3,
        type: 'NVR',
        brand: 'Hikvision',
        model: 'DS-2CD2143G0-I',
        location: 'Server Room'
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
