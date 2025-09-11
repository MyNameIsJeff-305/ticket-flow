let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StockMovements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      inventoryLocationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'InventoryLocations',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: 'IN, OUT, ADJUST, RESERVE, RELEASE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Always positive, sign determined by type'
      },
      reason: {
        type: Sequelize.STRING(200)
      },
      sourceType: {
        type: Sequelize.STRING(30), //Ticket, PurchaseOrder, Manual
        allowNull: false
      },
      sourceId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    options.tableName = 'StockMovements';
    await queryInterface.dropTable(options);
  }
};