'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { NasStationImages } = require('@db/models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await NasStationImages.bulkCreate([
      {
        nasStationId: 1,
        imageUrl: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/11/synology-diskstation-ds220-plus-hero.jpg',
        description: 'Image 1 description'
      },
      {
        nasStationId: 2,
        imageUrl: 'https://www.bhphotovideo.com/cdn-cgi/image/fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/qnap_ts_451_2g_us_turbo_nas_ts_451_nas_1480437973_1184489.jpg',
        description: 'Image 2 description'
      },
      {
        nasStationId: 3,
        imageUrl: 'https://www.cnet.com/a/img/resize/d5425b62a302fb757e9d0ee09a91fb62c19979e9/hub/2013/09/27/f4e82c59-6797-11e3-846b-14feb5ca9861/WDMyCloud_(7).jpg?auto=webp&fit=crop&height=1200&width=1200',
        description: 'Image 3 description'
      },
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'NasStationImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
