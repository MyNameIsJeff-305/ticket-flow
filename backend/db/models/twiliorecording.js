'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TwilioRecording extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TwilioRecording.belongsTo(models.TwilioCall, {
        foreignKey: 'callId',
        onDelete: 'CASCADE'
      })
    }
  }
  TwilioRecording.init({
    callId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TwilioCalls',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    recordingSid: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    callSid: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    accountSid: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    recordingUrl: {
      type: DataTypes.STRING(255),
    },
    recordingStatus: {
      type: DataTypes.STRING(64),
    },
    recordingStartTime: {
      type: DataTypes.STRING(64),
    },
    recordingDuration: {
      type: DataTypes.FLOAT,
    },
    transcription: {
      type: DataTypes.TEXT,
    },
    recordingChannels: {
      type: DataTypes.STRING(64),
    },
    recordingSource: {
      type: DataTypes.STRING(64),
    },
  }, {
    sequelize,
    modelName: 'TwilioRecording',
  });
  return TwilioRecording;
};