let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Signatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tickets",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      signedBy: {
        type: Sequelize.ENUM('employee', 'client'),
        allowNull: false
      },
      signatureImageURL: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
    
    await queryInterface.addConstraint("Signatures", {
      fields: ["ticketId"],
      type: "unique",
      name: "unique_signature_per_ticket",
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Signatures';
    await queryInterface.bulkDelete(options);
  }
};