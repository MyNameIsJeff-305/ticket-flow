'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Firewall extends Model {
    static associate(models) {
      Firewall.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
      Firewall.hasMany(models.FirewallImages, {
        foreignKey: 'firewallId',
        onDelete: 'CASCADE'
      });
    }
  }
  Firewall.init({
    assessmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Firewall',
  });
  return Firewall;
};