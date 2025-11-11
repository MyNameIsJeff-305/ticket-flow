'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TwilioRecordings', {
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
      recordingSid: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      callSid: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      accountSid: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      recordingUrl: {
        type: Sequelize.STRING(255),
      },
      recordingStatus: {
        type: Sequelize.STRING(64),
      },
      recordingStartTime: {
        type: Sequelize.STRING(64),
      },
      recordingDuration: {
        type: Sequelize.FLOAT,
      },
      transcription: {
        type: Sequelize.TEXT,
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
    options.tableName = 'TwilioRecordings';
    await queryInterface.dropTable(options);
  }
};