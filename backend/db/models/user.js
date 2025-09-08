'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Ticket, {
        foreignKey: 'createdBy',
        onDelete: 'CASCADE'
      }),
      User.hasMany(models.Note, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      }),
      User.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        onDelete: 'SET NULL'
      });
      User.hasMany(models.UserRole, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.TicketEmployee, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.StockMovement, {
        foreignKey: 'userId',
        onDelete: 'SET NULL'
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ' '
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ' '
    },
    profilePicUrl: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ' '
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'Departments',
        key: 'id'
      },
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
      },
    },
  });
  return User;
};