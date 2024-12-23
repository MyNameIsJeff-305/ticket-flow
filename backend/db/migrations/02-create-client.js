let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: ''
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: ''
      },
      companyName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: ''
      },
      email: {
        type: Sequelize.STRING(256),
        unique: true
      },
      profilePicUrl: {
        type: Sequelize.STRING(256),
        allowNull: false,
        defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        unique: true
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
    options.tableName = 'Clients';
    return queryInterface.dropTable(options);
  }
};