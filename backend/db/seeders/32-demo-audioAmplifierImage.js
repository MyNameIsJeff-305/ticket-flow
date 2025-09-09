'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { AudioAmplifierImage } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await AudioAmplifierImage.bulkCreate([
      {
        audioAmplifierId: 1,
        imageUrl: 'https://cdn-images.av-iq.com/products/enlarge/ADECIA%20Ceiling%20Solution%20750px.jpg',
        description: 'Front view of the audio amplifier'
      },
      {
        audioAmplifierId: 3,
        imageUrl: 'https://fr.yamaha.com/fr/files/VXC2P_scene_ceiling_1200x490_9ebb598e56ab4cf266d12ac9492edb84.jpg',
        description: 'Back view of the audio amplifier'
      },
      {
        audioAmplifierId: 2,
        imageUrl: 'https://www.proacousticsusa.com/media/catalog/product/cache/1/image/620x/9df78eab33525d08d6e5fb8d27136e95/q/_/q_loudspeakers_ads_6t_black_img_herofront.jpg',
        description: 'Side view of the audio amplifier'
      },
      {
        audioAmplifierId: 3,
        imageUrl: 'https://www.proacousticsusa.com/media/amoptimization/media/catalog/product/cache/1/image/620x/9df78eab33525d08d6e5fb8d27136e95/c/r/crss-4ds16fiza190hz_new.jpg',
        description: 'Top view of the audio amplifier'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'AudioAmplifierImages';
    await queryInterface.bulkDelete(options.tableName, null, options);
  }
};
