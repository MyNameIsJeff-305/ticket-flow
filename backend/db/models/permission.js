'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.hasMany(models.RolePermission, {
        foreignKey: 'permissionId',
        onDelete: 'CASCADE'
      });
    }
  }
  Permission.init({
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Permission',
  });
  return Permission;
};