'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { ServerImage } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await ServerImage.bulkCreate([
      {
        serverId: 1,
        imageUrl: 'https://i.ebayimg.com/images/g/IAIAAOSwiGlfK0jH/s-l1200.jpg',
        description: 'Image 1 description'
      },
      {
        serverId: 1,
        imageUrl: 'https://lastbestprice.com/wp-content/uploads/2018/08/Dell-PowerEdge-R740.jpg',
        description: 'Image 2 description'
      },
      {
        serverId: 2,
        imageUrl: 'https://m.media-amazon.com/images/I/51B+Z0ZfQVL.jpg',
        description: 'Image 3 description'
      },
      {
        serverId: 3,
        imageUrl: 'https://p1-ofp.static.pub//fes/cms/2024/11/22/zb6n0fo1igz7cczdqrrm4ndr11sr7u410423.png',
        description: 'Image 3 description'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ServerImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
