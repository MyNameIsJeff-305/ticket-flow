let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const { Signature } = require('@db/models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await Signature.bulkCreate([
      {
        ticketId: 1,
        employeeId: 1,
        signedBy: 'employee',
        signatureImageURL: 'https://www.morebusiness.com/wp-content/uploads/2020/09/handwritten-email-signature.jpg'
      },
      {
        ticketId: 2,
        employeeId: 2,
        signedBy: 'client',
        signatureImageURL: 'https://signaturely.com/wp-content/uploads/2020/04/oprah-winfrey-signature-signaturely.png'
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Signatures';
    await queryInterface.bulkDelete(options);
  }
};
