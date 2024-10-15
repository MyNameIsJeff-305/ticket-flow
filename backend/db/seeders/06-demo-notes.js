'use strict';

const { Note } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Note.bulkCreate([
      {
        note: "Printer is not working",
        userId: 1,
        ticketId: 1
      },
      {
        note: "Checked the power cord and is connected to the outlet",
        userId: 5,
        ticketId: 2
      },
      {
        note: "I have the license but I don't know how to installing it",
        userId: 6,
        ticketId: 3
      },
      {
        note: "I have tried resetting my password but it still doesn't work",
        userId: 6,
        ticketId: 4
      },
      {
        note: "Checked the power cord and is connected to the outlet",
        userId: 2,
        ticketId: 5
      },
      {
        note: "I have the license but I don't know how to installing it",
        userId: 6,
        ticketId: 6
      },
      {
        note: "I have tried resetting my password but it still doesn't work",
        userId: 3,
        ticketId: 7
      },
      {
        note: "Checked the power cord and is connected to the outlet",
        userId: 5,
        ticketId: 8
      },
      {
        note: "I have the license but I don't know how to installing it",
        userId: 6,
        ticketId: 9
      },
      {
        note: "I have tried resetting my password but it still doesn't work",
        userId: 2,
        ticketId: 10
      },
      {
        note: "Checked the power cord and is connected to the outlet",
        userId: 3,
        ticketId: 1
      },
      {
        note: "I have the license but I don't know how to installing it",
        userId: 2,
        ticketId: 2
      },
      {
        note: "I have tried resetting my password but it still doesn't work",
        userId: 2,
        ticketId: 4
      },
      {
        note: "Checked the power cord and is connected to the outlet",
        userId: 1,
        ticketId: 5
      },
      {
        note: "I have the license but I don't know how to installing it",
        userId: 1,
        ticketId: 5
      }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Notes';
    return queryInterface.bulkDelete(options, null, {});
  }
};
