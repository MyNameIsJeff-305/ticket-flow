'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nasStations', {
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
          model: 'assessments',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serialNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      storage: {
        type: Sequelize.STRING, // e.g., "2TB", "4TB"
        allowNull: false
      },
      bays: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iPAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iPType: { //If true, static. If false, DHCP
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      location: {
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
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'nasStations';
    await queryInterface.dropTable(options.tableName);
  }
};