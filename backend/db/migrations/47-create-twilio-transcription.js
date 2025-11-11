'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TwilioTranscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      callId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TwilioCalls',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      transcriptionSid: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      callSid: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      accountSid: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      timestamp: {
        type: Sequelize.STRING(64),
      },
      transcriptionEvent: {
        type: Sequelize.STRING(64),
      },
      sequenceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      transcriptionData: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      track: {
        type: Sequelize.STRING(32),
      },
      final: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    options.tableName = 'TwilioTranscriptions';
    await queryInterface.dropTable(options);
  }
};