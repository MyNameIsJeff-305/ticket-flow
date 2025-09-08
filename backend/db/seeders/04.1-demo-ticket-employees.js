let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { TicketEmployee } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await TicketEmployee.bulkCreate([
      {
        ticketId: 1,
        userId: 1
      },
      {
        ticketId: 1,
        userId: 2
      },
      {
        ticketId: 2,
        userId: 1
      },
      {
        ticketId: 2,
        userId: 3
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'TicketEmployees';
    await queryInterface.bulkDelete(options);
  }
};
