let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NetworkInformations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assessmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Assessments',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      internetServiceProvider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publicIP: {
        type: Sequelize.STRING
      },
      hasStaticIP: {
        type: Sequelize.STRING,
        allowNull: false
      },
      staticIP: {
        type: Sequelize.STRING
      },
      subnet: {
        type: Sequelize.STRING
      },
      gateway: {
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
    options.tableName = 'NetworkInformations';
    await queryInterface.dropTable(options.tableName);
  }
};