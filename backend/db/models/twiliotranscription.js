'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TwilioTranscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TwilioTranscription.belongsTo(models.TwilioCall, {
        foreignKey: 'callId',
        onDelete: 'CASCADE'
      })
    }
  }
  TwilioTranscription.init({
    callId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TwilioCalls',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    transcriptionSid: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    callSid: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    accountSid: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.STRING(64),
    },
    transcriptionEvent: {
      type: DataTypes.STRING(64),
    },
    sequenceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    transcriptionData: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    track: {
      type: DataTypes.STRING(32),
    },
    final: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'TwilioTranscription',
  });
  return TwilioTranscription;
};