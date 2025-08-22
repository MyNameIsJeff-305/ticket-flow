'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.User, {
        foreignKey: 'departmentId',
        onDelete: 'CASCADE'
      });
    }
  }
  Department.init({
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};