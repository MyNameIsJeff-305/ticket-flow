let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
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
      brand: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "Generic"
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "Standard"
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
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
    }, options);
  },

  async down(queryInterface) {
    options.tableName = 'Parts';
    await queryInterface.dropTable(options);
  }
};