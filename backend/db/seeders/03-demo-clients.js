'use strict';

const { Client } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Client.bulkCreate([
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "companyName": "",
        "email": "janesmith@techsolutions.com",
        "phone": "+13216549870",
        "profilePicUrl": "https://spor12.dk/wp-content/uploads/2017/05/speaker-1.jpg"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "IT Innovators",
        "email": "mjohnson@itinnovators.io",
        "phone": "+14567890123",
        "profilePicUrl": "https://governmenttechnologyinsider.com/wp-content/uploads/2018/09/shutterstock_691380820.jpg"
      },
      {
        "firstName": "Emily",
        "lastName": "Davis",
        "companyName": "",
        "email": "emilydavis@aa.io",
        "phone": "+17891234560",
        "profilePicUrl": "https://f4.bcbits.com/img/0032301221_10.jpg"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "SmartTech",
        "email": "david.martinez@smarttech.net",
        "phone": "+16549873210"
      },
      {
        "firstName": "Michel",
        "lastName": "García",
        "companyName": "",
        "email": "michelgr@smarttech.net",
        "phone": "+13059541866"
      },
      {
        id: 28,
        "firstName": "",
        "lastName": "",
        "companyName": "Anonymous Client",
        "email": "anonymous@client.com",
        "phone": "+10000000000",
        "profilePicUrl": "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"
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
          "michelgr@smarttech.net",
        ]
      }
    })
  }
}
