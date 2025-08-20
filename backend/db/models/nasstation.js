'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nasStation extends Model {
    static associate(models) {
      nasStation.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
      nasStation.hasMany(models.NasStationImages, {
        foreignKey: 'nasStationId',
        onDelete: 'CASCADE'
      });
    }
  }
  nasStation.init({
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assessments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storage: {
      type: DataTypes.STRING, // e.g., "2TB", "4TB"
      allowNull: false
    },
    bays: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    iPAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iPType: { //If true, static. If false, DHCP
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'nasStation',
  });
  return nasStation;
};