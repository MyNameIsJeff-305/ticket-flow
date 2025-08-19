'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FirewallImages extends Model {
    static associate(models) {
      FirewallImages.belongsTo(models.Firewall, {
        foreignKey: 'firewallId',
        onDelete: 'CASCADE'
      });
    }
  }
  FirewallImages.init({
    firewallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Firewalls',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'FirewallImages',
  });
  return FirewallImages;
};