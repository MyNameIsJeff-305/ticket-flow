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
        "title": "Network Connectivity Issues",
        "createdBy": 1,
        "clientId": 1,
        "description": "The office network is not working, can't connect to the internet.",
        "statusId": 1
      },
      {
        "title": "Slow Computer Performance",
        "createdBy": 2,
        "clientId": 2,
        "description": "My computer is very slow, it takes a long time to load applications.",
        "statusId": 1
      },
      {
        "title": "Need Help with Email Setup",
        "createdBy": 3,
        "clientId": 3,
        "description": "I'm having trouble setting up my email on Outlook.",
        "checkIn": "2021-06-01 10:00:00",
        "statusId": 2
      },
      {
        "title": "Keyboard Not Responding",
        "createdBy": 4,
        "clientId": 4,
        "description": "My keyboard isn't working even after reconnecting it to my desktop.",
        "checkIn": "2021-06-01 09:00:00",
        "checkOut": "2021-06-01 11:00:00",
        "statusId": 3
      },
      {
        "title": "Phone System Malfunction",
        "createdBy": 4,
        "clientId": 5,
        "description": "The office phone system is malfunctioning, can't make or receive calls.",
        "statusId": 1
      },
      {
        "title": "Printer Jamming Frequently",
        "createdBy": 5,
        "clientId": 6,
        "description": "The printer keeps jamming every time we print multiple pages.",
        "checkIn": "2024-09-10 08:30:00",
        "statusId": 2
      },
      {
        "title": "Monitor Flickering",
        "createdBy": 5,
        "clientId": 7,
        "description": "My monitor flickers on and off randomly.",
        "checkIn": "2024-09-10 10:00:00",
        "checkOut": "2024-09-10 12:00:00",
        "statusId": 3
      },
      {
        "title": "Wi-Fi Not Reaching All Areas",
        "createdBy": 5,
        "clientId": 8,
        "description": "The Wi-Fi signal is weak and not reaching all areas of the office.",
        "statusId": 1
      },
      {
        "title": "Computer Freezes During Work",
        "createdBy": 6,
        "clientId": 9,
        "description": "My computer freezes randomly while working, forcing me to restart.",
        "checkIn": "2024-09-11 13:00:00",
        "statusId": 2
      },
      {
        "title": "Software Update Issues",
        "createdBy": 6,
        "clientId": 10,
        "description": "Unable to install the latest software update, getting error codes.",
        "checkIn": "2024-09-11 14:00:00",
        "checkOut": "2024-09-11 16:00:00",
        "statusId": 3
      }
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
