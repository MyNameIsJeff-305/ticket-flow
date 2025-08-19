'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Switch extends Model {
    static associate(models) {
      Switch.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: "CASCADE"
      });
    }
  }
  Switch.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false, 
      },
    brand: { 
      type: DataTypes.STRING,
      allowNull: false, 
      },
    model: { 
      type: DataTypes.STRING,
      allowNull: false, 
      },
    ports: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
      },
    poE: { 
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      },
    location: { 
      type: DataTypes.STRING,
      allowNull: false, 
      }
  }, {
    sequelize,
    modelName: 'Switch',
  });
  return Switch;
};