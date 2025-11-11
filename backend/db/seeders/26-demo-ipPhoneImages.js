'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { IPPhoneImages } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await IPPhoneImages.bulkCreate([
      {
        iPPhoneId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/61idMOrNlQL._UF894,1000_QL80_.jpg',
        description: 'Image 1'
      },
      {
        iPPhoneId: 3,
        imageUrl: 'https://www.voipsupply.com/media/version1755224907/catalog/product/cache/1a46f9adc35a17df9cce3850e14779ac/4/1/411.jpg',
        description: 'Image 2'
      },
      {
        iPPhoneId: 1,
        imageUrl: 'https://cdn11.bigcommerce.com/s-u3uxlvxq3h/images/stencil/1280x1280/products/5138/22488/CP-8841-K9-RF-2__01827.1584429962.jpg',
        description: 'Image 3'
      },
      {
        iPPhoneId: 4,
        imageUrl: 'https://res.cloudinary.com/hdtsjhzsw/image/upload/s--ao_UyNat--/c_fit%2Cw_750%2Ch_500/40b488412249e0feeaf1b33fd8590671f56aa10d.webp',
        description: 'Image 1'
      },
      {
        iPPhoneId: 3,
        imageUrl: 'https://images.pcliquidations.com/images/isaac/125/125159t550.jpg',
        description: 'Image 2'
      },
      {
        iPPhoneId: 1,
        imageUrl: 'https://www.cisco.com/c/dam/assets/swa/img/600/video-and-voice-600x400.jpg',
        description: 'Image 3'
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'IPPhoneImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
