const { User } = require('../models')
const bcrypt = require("bcryptjs");
const twilioConfig = require('../../config/twilio');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: "Demo",
        lastName: "User",
        profilePicUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg",
        title: "Software Engineer",
        username: "DemoEmp1",
        email: "demo@aa.io",
        phone: "+11234567890",
        hashedPassword: bcrypt.hashSync("password"),
        departmentId: 1
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        profilePicUrl: "https://www.elitesingles.com/wp-content/uploads/sites/85/2020/06/elite_singles_slide_6-350x264.png",
        title: "Product Manager",
        username: "DemoEmp2",
        email: "jane@aa.io",
        phone: "+12345678901",
        hashedPassword: bcrypt.hashSync("password"),
        departmentId: 1
      },
      {
        firstName: "John",
        lastName: "Doe",
        profilePicUrl: "https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg",
        title: "UX Designer",
        username: "DemoEmp3",
        email: "john@aa.io",
        phone: "+13456789012",
        hashedPassword: bcrypt.hashSync("password"),
        departmentId: 1
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        profilePicUrl: "https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg",
        title: "Product Manager",
        username: "DemoEmp4",
        email: "jane1@aa.io",
        phone: "+14567890123",
        hashedPassword: bcrypt.hashSync("password"),
        departmentId: 2
      },
      {
        firstName: "George",
        lastName: "Smith",
        profilePicUrl: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg",
        title: "Data Scientist",
        username: "DemoEmp5",
        email: "george2@aa.io",
        phone: "+15678901234",
        hashedPassword: bcrypt.hashSync("password"),
        departmentId: 2
      },
      {
        firstName: "Steve",
        lastName: "Jobs",
        isActive: false,
        profilePicUrl: "https://cdn.vox-cdn.com/thumbor/yIoKynT0Jl-zE7yWwzmW2fy04xc=/0x0:706x644/1400x1400/filters:focal(353x322:354x323)/cdn.vox-cdn.com/uploads/chorus_asset/file/13874040/stevejobs.1419962539.png",
        title: "CEO",
        username: "DemoEmp6",
        email: "steve3@aa.io",
        phone: "+16789012345",
        hashedPassword: bcrypt.hashSync("password"),
      },
      {
        firstName: "Twilio",
        lastName: "Auto user",
        profilePicUrl: "",
        title: "NA",
        username: "twilioautouser",
        phone: "+17890123456",
        email: "autouser@thesmartsolution.net",
        hashedPassword: bcrypt.hashSync(twilioConfig.autoUserPassword),
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ["DemoEmp1", "DemoEmp2", "DemoEmp3", "DemoEmp4", "DemoEmp5", "DemoEmp6"]
      }
    }, {});
  }
};
