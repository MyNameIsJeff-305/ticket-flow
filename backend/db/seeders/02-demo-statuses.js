'use strict';

const { Status } = require('@db/models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Status.bulkCreate([
      {
        name: "Open",
        color: "#FF6B6B",
        description: "The ticket is open and has not been assigned to anyone"
      },
      {
        name: "In Progress",
        color: "#FFD93D",
        description: "The ticket is being worked on"
      },
      {
        name: "Closed",
        color: "#4CAF50",
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
