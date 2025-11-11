let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { locationEmail } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await locationEmail.bulkCreate([
      {
        locationId: 1,
        email: 'location1@example.com',
        emailType: 'General'
      },
      {
        locationId: 1,
        email: 'location1@example.com',
        emailType: 'Support'
      },
      {
        locationId: 3,
        email: 'location2@example.com',
        emailType: 'General'
      },
      {
        locationId: 5,
        email: 'location2@example.com',
        emailType: 'Support'
      },
      {
        locationId: 5,
        email: 'location3@example.com',
        emailType: 'General'
      },
      {
        locationId: 5,
        email: 'location3@example.com',
        emailType: 'Support'
      },
      {
        locationId: 5,
        email: 'location4@example.com',
        emailType: 'General'
      },
      {
        locationId: 6,
        email: 'location4@example.com',
        emailType: 'Support'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'locationEmails';
    await queryInterface.bulkDelete(options.tableName, null, {});
  }
};
