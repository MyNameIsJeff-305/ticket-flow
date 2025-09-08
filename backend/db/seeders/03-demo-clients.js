'use strict';

const { Client } = require('@db/models');

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
        "phone": "321-654-9870",
        "profilePicUrl": "https://spor12.dk/wp-content/uploads/2017/05/speaker-1.jpg"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "IT Innovators",
        "email": "mjohnson@itinnovators.io",
        "phone": "456-789-0123",
        "profilePicUrl": "https://governmenttechnologyinsider.com/wp-content/uploads/2018/09/shutterstock_691380820.jpg"
      },
      {
        "firstName": "Emily",
        "lastName": "Davis",
        "companyName": "",
        "email": "emilydavis@aa.io",
        "phone": "789-123-4560",
        "profilePicUrl": "https://f4.bcbits.com/img/0032301221_10.jpg"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "SmartTech",
        "email": "david.martinez@smarttech.net",
        "phone": "654-987-3210",
        "profilePicUrl": "https://img.freepik.com/premium-vector/smart-tech-letter-s-logo-template_68967-123.jpg"
      },
      {
        "firstName": "Sarah",
        "lastName": "Lee",
        "companyName": "",
        "email": "sarahlee@innovativesolutions.org",
        "phone": "987-654-3210",
        "profilePicUrl": "https://images.squarespace-cdn.com/content/v1/56f1eef5cf80a1b80c98a441/1461696920672-HG34RDDLG6JA6FS2HYYG/image-asset.jpeg"
      },
      {
        "firstName": "James",
        "lastName": "Brown",
        "companyName": "",
        "email": "jamesbrown@aa.io",
        "phone": "123-789-4560",
        "profilePicUrl": "https://cdn.britannica.com/34/197534-050-83C616C4/James-Brown-1991.jpg"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "TechHub",
        "email": "lindagarcia@techhub.com",
        "phone": "321-987-6543",
        "profilePicUrl": "https://pbs.twimg.com/profile_images/995939511547940864/oiLZiwNr_400x400.jpg"
      },
      {
        "firstName": "Robert",
        "lastName": "Wilson",
        "companyName": "",
        "email": "robertwilson@aa.io",
        "phone": "456-123-7890",
        "profilePicUrl": "https://gsb-faculty.stanford.edu/robert-wilson/files/2019/12/Robert-Wilson_450x450.jpg"
      },
      {
        "firstName": "",
        "lastName": "",
        "companyName": "NextGen Tech",
        "email": "jtaylor@nextgentech.co",
        "phone": "789-321-6540",
        "profilePicUrl": "https://www.getsupport.co.uk/wp-content/uploads/2021/04/future-of-it-support.jpg"
      },
      {
        "firstName": "William",
        "lastName": "Anderson",
        "companyName": "",
        "email": "wanderson@futureit.com",
        "phone": "654-321-9876",
        "profilePicUrl": "https://case.fiu.edu/about/directory/people/_assets/profiles/william-anderson---deans-office.jpg"
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
