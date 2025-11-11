'use strict';

const { FirewallImages } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await FirewallImages.bulkCreate([
      {
        firewallId: 1,
        imageUrl: 'https://www.telquestintl.com/site/images/products/ASA5506-K9-LN.Media-1.jpg',
        description: 'Front view of the Cisco ASA 5506-X'
      },
      {
        firewallId: 1,
        imageUrl: 'https://i.ebayimg.com/images/g/93UAAOSw6QRmaBqJ/s-l1200.jpg',
        description: null
      },
      {
        firewallId: 2,
        imageUrl: 'https://www.telquestintl.com/site/images/products/FG-60F-LN.Media-1.jpg',
        description: 'Side view of the FortiGate 60F'
      },
      {
        firewallId: 3,
        imageUrl: 'https://www.networktigers.com/cdn/shop/files/palo-alto-PA-220_large.jpg?v=1701634940',
        description: 'Rear view of the Palo Alto PA-220'
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName= 'FirewallImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
