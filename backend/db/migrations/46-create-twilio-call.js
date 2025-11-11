'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TwilioCalls', {
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
      called: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      callSid: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      to: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      callStatus: {
        type: Sequelize.STRING(24),
        allowNull: false
      },
      from: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      callDuration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      accountSid: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      applicationSid: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      caller: {
        type: Sequelize.STRING(32),
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
    options.tableName = 'TwilioCalls';
    await queryInterface.dropTable(options);
  }
};