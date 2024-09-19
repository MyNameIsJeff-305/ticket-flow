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
        companyName: " ",
        email: "demo@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "employee",
      },
      {
        username: "DemoEmp2",
        firstName: "John",
        lastName: "Doe",
        companyName: " ",
        email: "demo2@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "employee",
      },
      {
        username: "DemoEmp3",
        firstName: "John",
        lastName: "Doe",
        companyName: " ",
        email: "demo3@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "employee",
      },
      {
        username: "DemoClient1",
        firstName: "Jane",
        lastName: "Doe",
        companyName: " ",
        email: "jane@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "client",
      },
      {
        username: "DemoClient2",
        firstName: "George",
        lastName: "Smith",
        companyName: " ",
        email: "gsmith@aa.io",
        hashedPassword: bcrypt.hashSync("password"),
        role: "client",
      },
      {
        username: "DemoCompany",
        firstName: " ",
        lastName: " ",
        companyName: "Demo Company",
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
      username: { [Op.in]: ['DemoEmp1','DemoEmp2','DemoEmp3', 'DemoClient1', 'DemoClient2', 'DemoClient3'] }
    }, {});
  }
};
