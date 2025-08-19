'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SwitchImage extends Model {
    static associate(models) {
      SwitchImage.belongsTo(models.Switch, {
        foreignKey: 'switchId',
        onDelete: 'CASCADE'
      });
    }
  }
  SwitchImage.init({
    switchId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Switches',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    imageUrl: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'SwitchImage',
  });
  return SwitchImage;
};