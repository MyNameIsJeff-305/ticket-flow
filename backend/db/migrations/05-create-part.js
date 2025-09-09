let options1 = {};
let options2 = {};
if (process.env.NODE_ENV === 'production') {
  options1.schema = process.env.SCHEMA;
  options2.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Parts (catálogo)
    await queryInterface.createTable('Parts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, autoIncrement: true
      },
      sku: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(100), allowNull: false
      },
      description: {
        type: Sequelize.STRING(255)
      },
      unit: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'unit'
      },
      defaultPrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options1);

    // 2) PartImages (colgando del catálogo)
    await queryInterface.createTable('PartImages', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      partId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Parts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      partImageURL: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(255)
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options2);
  },

  async down(queryInterface) {
    options1.tableName = 'Parts';
    options2.tableName = 'PartImages';
    await queryInterface.dropTable(options1);
    await queryInterface.dropTable(options2);
  }
};