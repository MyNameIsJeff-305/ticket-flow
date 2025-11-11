'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          {
            tableName: 'TwilioRecordings',
            schema: options.schema
          },
          'recordingChannels',
          {
            type: Sequelize.STRING(64),
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          {
            tableName: 'TwilioRecordings',
            schema: options.schema
          },
          'recordingSource',
          {
            type: Sequelize.STRING(64),
          },
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn({
          tableName: 'TwilioRecordings',
          schema: options.schema
        }, 'recordingChannels', { transaction: t }),
        queryInterface.removeColumn({
          tableName: 'TwilioRecordings',
          schema: options.schema
        }, 'recordingSource', { transaction: t }),
      ]);
    });
  },
};