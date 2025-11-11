let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PartImage } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await PartImage.bulkCreate([
      {
        partId: 1,
        partImageURL: 'https://upload.wikimedia.org/wikipedia/commons/6/61/EthernetCableGreen.jpg',
        description: 'Image 1 description'
      },
      {
        partId: 1,
        partImageURL: 'https://www.cmple.com/content/images/thumbs/cat5e-ethernet-cable-10ft-green-utp-350-mhz-1gbps-rj45-lan-network-patch-cable_NID0009466.jpeg',
        description: 'Image 2 description'
      },
      {
        partId: 3,
        partImageURL: 'https://cdn11.bigcommerce.com/s-2bh7dp4k3r/images/stencil/1280x1280/products/8313/23624/UDM-PRO-MAX_003__14746.1750190684.jpg',
        description: 'Ubiquiti Dream Machine Pro'
      },
      {
        partId: 3,
        partImageURL: 'https://cdn11.bigcommerce.com/s-2bh7dp4k3r/images/stencil/1280x1280/products/8313/20869/UDM-PRO-MAX_001__77406.1750190683.jpg',
        description: 'Image 4 description'
      },
      {
        partId: 3,
        partImageURL: 'https://cdn11.bigcommerce.com/s-2bh7dp4k3r/images/stencil/1280x1280/products/8313/23630/UDM-PRO-MAX_04__99980.1750190684.jpg',
        description: 'Image 5 description'
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PartImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('PartImages', {
      partImageURL: {
        [Op.in]: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
          'https://example.com/image3.jpg'
        ]
      }
    }, options);
  }
};
