let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketParts', {
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
          model: 'Tickets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      partId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Parts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'REQUESTED',
        comment: 'PENDING, ORDERED, RECEIVED, CANCELED'
      },
      inventoryLocationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'InventoryLocations',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      notes: {
        type: Sequelize.STRING
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
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'TicketParts';
    await queryInterface.dropTable(options);
  }
};