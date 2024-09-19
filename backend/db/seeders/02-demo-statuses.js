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
        color: "#00FF00",
        description: "The ticket is open and has not been assigned to anyone"
      },
      {
        name: "In Progress",
        color: "#FFA500",
        description: "The ticket is being worked on"
      },
      {
        name: "Closed",
        color: "#0000FF",
        description: "The ticket has been resolved"
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
