'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.UserRole, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE'
      });
      Role.hasMany(models.RolePermission, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE'
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};