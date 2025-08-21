'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { IntraoralSensor } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await IntraoralSensor.bulkCreate([
      {
        dentalPracticeInformationId: 1,
        brand: 'AZdent',
        model: 'Size1',
        serialNumber: '1234567890'
      },
      {
        dentalPracticeInformationId: 1,
        brand: 'AZdent',
        model: 'Size2',
        serialNumber: '0987654321'
      },
      {
        dentalPracticeInformationId: 2,
        brand: 'Woodpecker',
        model: 'H2',
        serialNumber: '1122334455'
      },
      {
        dentalPracticeInformationId: 3,
        brand: 'InteliSensor',
        model: 'DRXDR530',
        serialNumber: '1234567890'
      },
      {
        dentalPracticeInformationId: 3,
        brand: 'InteliSensor',
        model: 'DRXDR530',
        serialNumber: '0987654321'
      },
      {
        dentalPracticeInformationId: 3,
        brand: 'InteliSensor',
        model: 'DRXDR550',
        serialNumber: '1122334455'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'IntraoralSensors';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
