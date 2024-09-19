'use strict';

const { Client } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Client.bulkCreate([
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "companyName": "",
        "email": "janesmith@techsolutions.com",
        "phone": "321-654-9870"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "IT Innovators",
        "email": "mjohnson@itinnovators.io",
        "phone": "456-789-0123"
      },
      {
        "firstName": "Emily",
        "lastName": "Davis",
        "companyName": "",
        "email": "emilydavis@aa.io",
        "phone": "789-123-4560"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "SmartTech",
        "email": "david.martinez@smarttech.net",
        "phone": "654-987-3210"
      },
      {
        "firstName": "Sarah",
        "lastName": "Lee",
        "companyName": "",
        "email": "sarahlee@innovativesolutions.org",
        "phone": "987-654-3210"
      },
      {
        "firstName": "James",
        "lastName": "Brown",
        "companyName": "",
        "email": "jamesbrown@aa.io",
        "phone": "123-789-4560"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "TechHub",
        "email": "lindagarcia@techhub.com",
        "phone": "321-987-6543"
      },
      {
        "firstName": "Robert",
        "lastName": "Wilson",
        "companyName": "",
        "email": "robertwilson@aa.io",
        "phone": "456-123-7890"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "NextGen Tech",
        "email": "jtaylor@nextgentech.co",
        "phone": "789-321-6540"
      },
      {
        "firstName": "William",
        "lastName": "Anderson",
        "companyName": "",
        "email": "wanderson@futureit.com",
        "phone": "654-321-9876"
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Clients';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Clients', {
      email: {
        [Op.in]: [
          "janesmith@techsolutions.com", "mjohnson@itinnovators.io", "emilydavis@aa.io",
          "david.martinez@smarttech.net", "sarahlee@innovativesolutions.org", "jamesbrown@aa.io",
          "lindagarcia@techhub.com", "robertwilson@aa.io", "jtaylor@nextgentech.co", "wanderson@futureit.com",
        ]
      }
    })
  }
}
