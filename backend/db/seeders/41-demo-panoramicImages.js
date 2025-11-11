'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PanoramicImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await PanoramicImage.bulkCreate([
      {
        panoramicId: 1,
        imageUrl: 'https://cdn11.bigcommerce.com/s-dd073/images/stencil/1280x1280/products/170/5059/planmeca-planmeca-promax-3d-plus-panorex-cone-beam__93587.1752285132.jpg',
        description: 'Image 1 description'
      },
      {
        panoramicId: 1,
        imageUrl: 'https://cdn11.bigcommerce.com/s-dd073/images/stencil/1280x1280/products/170/3724/planmeca-planmeca-promax-3d-plus-panorex-cone-beam__46521.1752250480.jpg',
        description: 'Image 2 description'
      },
      {
        panoramicId: 2,
        imageUrl: 'https://cdn11.bigcommerce.com/s-dd073/images/stencil/1280x1280/products/181/3580/sirona-sirona-orthophos-sl-3d-panorex-cone-beam__56272.1709940351.jpg',
        description: 'Image 3 description'
      },
      {
        panoramicId: 3,
        imageUrl: 'https://cdn11.bigcommerce.com/s-dd073/images/stencil/1280x1280/products/205/4548/vatech-vatech-pax-i3d-smart-panorex-cone-beam__84573.1673691267.jpg',
        description: 'Image 3 description'
      },
      {
        panoramicId: 3,
        imageUrl: 'https://cdn11.bigcommerce.com/s-dd073/images/stencil/1280x1280/products/205/4549/vatech-vatech-pax-i3d-smart-panorex-cone-beam__90986.1673691268.jpg',
        description: 'Image 3 description'
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PanoramicImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  },
};
