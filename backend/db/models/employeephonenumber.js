'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeePhoneNumber extends Model {
    static associate(models) {
      EmployeePhoneNumber.belongsTo(models.User, {
        foreignKey: 'employeeId',
        onDelete: 'CASCADE'
      });
    }
  }
  EmployeePhoneNumber.init({
    employeeId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EmployeePhoneNumber',
  });
  return EmployeePhoneNumber;
};