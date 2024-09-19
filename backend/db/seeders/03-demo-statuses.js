'use strict';

const { Status } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Status.bulkCreate([
      {
        name: "Open",
        color: "#00FF00"
      },
      {
        name: "In Progress",
        color: "#FFA500"
      },
      {
        name: "Closed",
        color: "#0000FF"
      },
      {
        name: "Cancelled",
        color: "#333"
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Statuses";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Statuses', {
      name: {
        [Op.in]: ["Open", "In Progress", "Closed", "Cancelled"]
      }
    }, options);
  }
};
