'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assessment extends Model {
    static associate(models) {
      Assessment.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
      });
    }
  }
  Assessment.init({
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    locationId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: { 
        model: 'Locations', 
        key: 'id' 
      },
      onDelete: 'CASCADE' 
    }
  }, {
    sequelize,
    modelName: 'Assessment',
  });
  return Assessment;
};