'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { IntraoralSensorImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await IntraoralSensorImage.bulkCreate([
      {
        intraoralSensorId: 1,
        imageUrl: 'https://azdentall.com/cdn/shop/files/01_2cc9a1e4-289e-44bb-a502-9deef0d1a119.jpg',
        description: 'Image 1 description'
      },
      {
        intraoralSensorId: 1,
        imageUrl: 'https://azdentall.com/cdn/shop/files/03_190dae06-41cf-49f3-b44f-8ea3f92d71c0.jpg',
        description: 'Image 2 description'
      },
      {
        intraoralSensorId: 3,
        imageUrl: 'https://www.lionsdentalsupply.com/files/42528355.jpg',
        description: 'Image 3 description'
      },
      {
        intraoralSensorId: 4,
        imageUrl: 'https://www.dentistrx.com/cdn/shop/files/Product2-PortableDentalX-RayDigitalSensor3_1200x1200.jpg',
        description: 'Image 2 description'
      },
      {
        intraoralSensorId: 5,
        imageUrl: 'https://image.made-in-china.com/202f0j00URHvfbkygtcS/Lk-C67-Large-Size-2-Rvg-Dental-Digital-Intraoral-X-Ray-Sensor-Cheap-Price.webp',
        description: 'Image 3 description'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'IntraoralSensorImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
