'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PrinterImage } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    PrinterImage.bulkCreate([
      {
        printerId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/61XB+TikfjL.jpg',
        description: 'Printer 1 Image'
      },
      {
        printerId: 3,
        imageUrl: 'https://mediaserver.goepson.com/ImConvServlet/imconv/ced8277812e66069df3e9354a3e57847ebab5be8/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=v600_fla-osr-nn_690x460https://5.imimg.com/data5/SELLER/Default/2020/11/ST/SX/ZK/3245790/documents-desktop-scanner-500x500.jpg',
        description: 'Printer 2 Image'
      },
      {
        printerId: 1,
        imageUrl: 'https://www.hp.com/content/dam/sites/worldwide/printers/scanners/n-4000-snw-1-img@2x.jpg',
        description: 'Printer 3 Image'
      },
      {
        printerId: 4,
        imageUrl: 'https://i5.walmartimages.com/seo/Brother-Professional-Monochrome-Color-Desktop-Scanner-for-Business-Workgroups-ADS-4300N_a61e7933-589d-45ec-a796-657744c0187d.d2c601464080ccba75133c62b7b74350.jpeg',
        description: 'Printer 4 Image'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PrinterImages';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
