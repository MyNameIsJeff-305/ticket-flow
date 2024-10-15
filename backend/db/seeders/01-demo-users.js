const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        username: "DemoEmp1",
        role: "user",
        firstName: "Demo",
        lastName: "User",
        email: "demo@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg"
      },
      {
        role: "user",
        username: "DemoEmp2",
        firstName: "Tom",
        lastName: "Holland",
        email: "demo2@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://www.elitesingles.com/wp-content/uploads/sites/85/2020/06/elite_singles_slide_6-350x264.png"
      },
      {
        username: "DemoEmp3",
        role: "user",
        firstName: "John",
        lastName: "Doe",
        email: "demo3@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg"
      },
      {
        username: "DemoEmp4",
        role: "user",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg"
      },
      {
        username: "DemoEmp5",
        role: "user",
        firstName: "George",
        lastName: "Smith",
        email: "gsmith@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
      },
      {
        username: "DemoEmp6",
        role: "user",
        firstName: "Steve",
        lastName: "Jobs",
        email: "democompany@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://cdn.vox-cdn.com/thumbor/yIoKynT0Jl-zE7yWwzmW2fy04xc=/0x0:706x644/1400x1400/filters:focal(353x322:354x323)/cdn.vox-cdn.com/uploads/chorus_asset/file/13874040/stevejobs.1419962539.png"
      },
      {
        username: "DemoClient1",
        role: "client",
        firstName: "Jane",
        lastName: "Smith",
        companyName: " ",
        email: "janesmith@clients.io",
        phone: "321-654-9870",
        profilePicUrl: "https://spor12.dk/wp-content/uploads/2017/05/speaker-1.jpg"
      },
      {
        username: "DemoClient2",
        role: "client",
        firstName: "",
        lastName: "",
        companyName: "IT Innovators",
        email: "mjohnson@itinnovators.io",
        phone: "456-789-0123",
        profilePicUrl: "https://governmenttechnologyinsider.com/wp-content/uploads/2018/09/shutterstock_691380820.jpg"
      },
      {
        username: "DemoClient3",
        role: "client",
        firstName: "Emily",
        lastName: "Davis",
        companyName: " ",
        email: "emilydavis@aa.io",
        phone: "789-123-4560",
        profilePicUrl: "https://f4.bcbits.com/img/0032301221_10.jpg"
      },
      {
        username: "DemoClient4",
        role: "client",
        firstName: "",
        lastName: "",
        companyName: "SmartTech",
        email: "david.martinez@smarttech.net",
        phone: "654-987-3210",
        profilePicUrl: "https://img.freepik.com/premium-vector/smart-tech-letter-s-logo-template_68967-123.jpg"
      },
      {
        username: "DemoClient5",
        role: "client",
        firstName: "Sarah",
        lastName: "Lee",
        companyName: " ",
        email: "sarahlee@innovativesolutions.org",
        phone: "987-654-3210",
        profilePicUrl: "https://images.squarespace-cdn.com/content/v1/56f1eef5cf80a1b80c98a441/1461696920672-HG34RDDLG6JA6FS2HYYG/image-asset.jpeg"
      },
      {
        username: "DemoClient6",
        role: "client",
        firstName: "James",
        lastName: "Brown",
        companyName: " ",
        email: "jamesbrown@aa.io",
        phone: "123-789-4560",
        profilePicUrl: "https://cdn.britannica.com/34/197534-050-83C616C4/James-Brown-1991.jpg"
      },
      {
        username: "DemoClient7",
        role: "client",
        firstName: "",
        lastName: "",
        companyName: "TechHub",
        email: "lindagarcia@techhub.com",
        phone: "321-987-6543",
        profilePicUrl: "https://pbs.twimg.com/profile_images/995939511547940864/oiLZiwNr_400x400.jpg"
      },
      {
        username: "DemoClient8",
        role: "client",
        firstName: "Robert",
        lastName: "Wilson",
        companyName: " ",
        email: "robertwilson@aa.io",
        phone: "789-456-1230",
        profilePicUrl: "https://gsb-faculty.stanford.edu/robert-wilson/files/2019/12/Robert-Wilson_450x450.jpg"
      },
      {
        username: "DemoClient9",
        role: "client",
        firstName: "",
        lastName: "",
        companyName: "NextGen Tech",
        email: "jtaylor@nextgentech.co",
        phone: "456-123-7890",
        profilePicUrl: "https://www.getsupport.co.uk/wp-content/uploads/2021/04/future-of-it-support.jpg"
      },
      {
        username: "DemoClient10",
        role: "client",
        firstName: "William",
        lastName: "Anderson",
        companyName: " ",
        email: "wanderson@futureit.com",
        phone: "123-789-4560",
        profilePicUrl: "https://case.fiu.edu/about/directory/people/_assets/profiles/william-anderson---deans-office.jpg"
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ["DemoEmp1", "DemoEmp2", "DemoEmp3", "DemoEmp4", "DemoEmp5", "DemoEmp6", "DemoClient1", "DemoClient2", "DemoClient3", "DemoClient4", "DemoClient5", "DemoClient6", "DemoClient7", "DemoClient8", "DemoClient9", "DemoClient10"]
      }
    }, {});
  }
};
