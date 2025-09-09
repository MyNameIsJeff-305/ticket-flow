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
        partImageURL: 'https://example.com/image1.jpg',
        description: 'Image 1 description'
      },
      {
        partId: 1,
        partImageURL: 'https://example.com/image2.jpg',
        description: 'Image 2 description'
      },
      {
        partId: 2,
        partImageURL: 'https://example.com/image3.jpg',
        description: 'Image 3 description'
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
