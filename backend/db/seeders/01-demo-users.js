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
        role: "employee",
      },
      {
        username: "DemoEmp2",
        firstName: "Tom",
        lastName: "Holland",
        email: "demo2@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "employee",
      },
      {
        username: "DemoEmp3",
        firstName: "John",
        lastName: "Doe",
        email: "demo3@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "employee",
      },
      {
        username: "DemoEmp4",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "client",
      },
      {
        username: "DemoEmp5",
        firstName: "George",
        lastName: "Smith",
        email: "gsmith@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "client",
      },
      {
        username: "DemoEmp6",
        firstName: "Steve",
        lastName: "Jobs",
        email: "democompany@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "client",
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
