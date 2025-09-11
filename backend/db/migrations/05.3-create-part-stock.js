let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PartStocks', {
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
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      minThreshold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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

    await queryInterface.addConstraint('PartStocks', {
      fields: ['partId', 'inventoryLocationId'],
      type: 'unique',
      name: 'unique_part_inventory_location'
    });
  },
  
  async down(queryInterface, Sequelize) {
    options.tableName = 'PartStocks';
    await queryInterface.dropTable(options);
  }
};