'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Panoramic } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Panoramic.bulkCreate([
      {
        dentalPracticeInformationId: 1,
        brand: 'PLANMECA',
        model: 'PROMAX 3D Plus Panorex',
        networkDeployed: true
      },
      {
        dentalPracticeInformationId: 2,
        brand: 'SIRONA',
        model: 'ORTHOPHOS SL 3D Panorex',
        networkDeployed: false
      },
      {
        dentalPracticeInformationId: 3,
        brand: 'VATECH',
        model: 'PaX-i3D Smart Panorex',
        networkDeployed: true
      },
      {
        dentalPracticeInformationId: 3,
        brand: 'PLANMECA',
        model: 'PROMAX 3D Plus Panorex',
        networkDeployed: false
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Panoramics';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
