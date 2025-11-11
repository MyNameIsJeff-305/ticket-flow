'use strict';

const {Location} = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Location.bulkCreate([
      {
        name: 'House',
        clientId: 1,
        addressLine1: '123 Main St',
        addressLine2: 'Suite 100',
        city: 'Anytown',
        state: 'CA',
        zipcode: 12345,
        profilePicUrl: 'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house.jpg'
      },
      {
        name: 'Office',
        clientId: 1,
        addressLine1: '456 Elm St',
        addressLine2: null,
        city: 'Othertown',
        state: 'CA',
        zipcode: 67890
      },
      {
        name: 'Main Location',
        clientId: 2,
        addressLine1: '789 Oak St',
        addressLine2: null,
        city: 'Sometown',
        state: 'CA',
        zipcode: 13579,
        profilePicUrl: 'https://images.ctfassets.net/ksxncq3aj87t/1dD7ZLyLxS4OuprJPfGCVK/8c31e984a8bf346d0b66ff9342f62604/warehouse_setup_1.png'
      },
      {
        name: 'Laboratory',
        clientId: 2,
        addressLine1: '101 Pine St',
        addressLine2: 'Apt 2B',
        city: 'Anycity',
        state: 'CA',
        zipcode: 24680,
        profilePicUrl: 'https://www.news-medical.net/images/appnotes/ImageForAppNote_5166_17219167727185418.jpg'

      },
      {
        name: 'Warehouse',
        clientId: 2,
        addressLine1: '202 Maple St',
        addressLine2: null,
        city: 'Othercity',
        state: 'CA',
        zipcode: 11223,
        profilePicUrl: 'https://m.media-amazon.com/images/G/01/wfs/20230227_Amazon_369_Update_1_1.png'
      },
      {
        name: 'Location 6',
        clientId: 3,
        addressLine1: '303 Birch St',
        addressLine2: 'Floor 3',
        city: 'Somecity',
        state: 'CA',
        zipcode: 44556,
        profilePicUrl: 'https://constructlab.net/wp-content/uploads/2024/05/kiosk_of_reciprocity_01.jpg'
      },
      {
        name: 'Location 7',
        clientId: 3,
        addressLine1: '404 Cedar St',
        addressLine2: null,
        city: 'Anyvillage',
        state: 'CA',
        zipcode: 77889
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Locations';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
