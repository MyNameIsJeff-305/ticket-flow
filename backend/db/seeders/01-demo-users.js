'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        username: "DemoEmp1",
        firstName: "Demo",
        lastName: "User",
        email: "demo@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg"
      },
      {
        username: "DemoEmp2",
        firstName: "Tom",
        lastName: "Holland",
        email: "demo2@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://www.elitesingles.com/wp-content/uploads/sites/85/2020/06/elite_singles_slide_6-350x264.png"
      },
      {
        username: "DemoEmp3",
        firstName: "John",
        lastName: "Doe",
        email: "demo3@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://img.freepik.com/free-photo/close-up-young-person-barbeque_23-2149271990.jpg"
      },
      {
        username: "DemoEmp4",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg"
      },
      {
        username: "DemoEmp5",
        firstName: "George",
        lastName: "Smith",
        email: "gsmith@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
      },
      {
        username: "DemoEmp6",
        firstName: "Steve",
        lastName: "Jobs",
        email: "democompany@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        profilePicUrl: "https://cdn.vox-cdn.com/thumbor/yIoKynT0Jl-zE7yWwzmW2fy04xc=/0x0:706x644/1400x1400/filters:focal(353x322:354x323)/cdn.vox-cdn.com/uploads/chorus_asset/file/13874040/stevejobs.1419962539.png"
      },
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
