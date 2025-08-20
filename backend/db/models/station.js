'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      Station.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
    }
  }
  Station.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    stationName: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    model: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    formFactor: { //Can be: All-In-One, Desktop, Micro Station, Mini Station
      type: DataTypes.STRING,
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
    modelName: 'Station',
  });
  return Station;
};