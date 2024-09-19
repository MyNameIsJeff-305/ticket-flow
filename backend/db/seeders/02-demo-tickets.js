'use strict';

const { Ticket } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Ticket.bulkCreate([
      {
        title: "Need Help with my Printer",
        createdBy: 4,
        takenBy: null,
        description: "Printer is not working",
        checkIn: null,
        checkOut: null,
        statusId: 1
      },
      {
        title: "My Computer is not Turning On",
        createdBy: 5,
        takenBy: 2,
        description: "Computer is not turning on, checked the power cord and is connected to the outlet",
        checkIn: null,
        checkOut: null,
        statusId: 1
      },
      {
        title: "Need Help Installing Microsoft Office",
        createdBy: 6,
        takenBy: 2,
        description: "I need help installing Microsoft Office on my computer, I have the license but I don't know how to installing it",
        checkIn: "2021-06-01 12:00:00",
        checkOut: null,
        statusId: 2
      },
      {
        title: "I can't sign in to the accounting software",
        createdBy: 4,
        takenBy: 1,
        description: "The accounting software is not letting me sign in, I have tried resetting my password but it still doesn't work",
        checkIn: "2021-06-01 12:00:00",
        checkOut: "2021-06-01 14:00:00",
        statusId: 3
      },
      {
        title: "My Computer is not Turning On",
        createdBy: 5,
        takenBy: null,
        description: "Computer is not turning on, checked the power cord and is connected to the outlet",
        checkIn: "2021-02-01 12:00:00",
        checkOut: null,
        statusId: 2
      },
      {
        title: "Need Help Installing Microsoft Office",
        createdBy: 6,
        takenBy: 3,
        description: "I need help installing Microsoft Office on my computer, I have the license but I don't know how to installing it",
        checkIn: "2024-10-07 12:00:00",
        checkOut: "2024-10-08 14:00:00",
        statusId: 3
      },
    ], options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tickets';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Need Help with my Printer', 'My Computer is not Turning On', 'Need Help Installing Microsoft Office', "I can't sign in to the accounting software"] }
    }, {})
  }
};
