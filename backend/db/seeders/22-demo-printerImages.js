'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { PrinterImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await PrinterImage.bulkCreate([
      {
        printerId: 1,
        imageUrl: 'https://m.media-amazon.com/images/I/61n1Vw2BpkL._UF894,1000_QL80_.jpg',
        description: 'Image 1 description'
      },
      {
        printerId: 1,
        imageUrl: 'https://whitespiderelectronics.com/wp-content/uploads/2023/09/m404dn_3.jpg',
        description: 'Image 2 description'
      },
      {
        printerId: 2,
        imageUrl: 'https://i.rtings.com/assets/products/PvBN3jjZ/canon-imageclass-mf743cdw/design-medium.jpg',
        description: 'Image 3 description'
      },
      {
        printerId: 3,
        imageUrl: 'https://cdn.mos.cms.futurecdn.net/cNmnaYfuzNzG5uuVjADpj3.png',
        description: 'Image 4 description'
      },
      {
        printerId: 4,
        imageUrl: 'https://i.rtings.com/assets/products/jwMYl7Re/brother-hl-l2390dw-hl-l2395dw/design-medium.jpg',
        description: 'Image 1 description'
      },
      {
        printerId: 5,
        imageUrl: 'https://www.abdofficesolutions.com/cdn/shop/products/Kyocera_ECOSYS_P2040dw_grande.png',
        description: 'Image 2 description'
      },
      {
        printerId: 6,
        imageUrl: 'https://www.amatteroffax.com/assets/images/defaultproducts/L081-346.jpg',
        description: 'Image 3 description'
      },
      {
        printerId: 7,
        imageUrl: 'https://cdn.mos.cms.futurecdn.net/FTSKivjpwGwK9X2MJyY557.jpg',
        description: 'Image 4 description'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'PrinterImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
