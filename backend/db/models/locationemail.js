'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locationEmail extends Model {
    static associate(models) {
      locationEmail.belongsTo(models.Location, {
        foreignKey: 'locationId',
        onDelete: 'CASCADE'
      });
    }
  }
  locationEmail.init({
    emailType: {
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'locationEmail',
  });
  return locationEmail;
};