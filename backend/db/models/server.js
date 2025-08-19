'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    static associate(models) {
      Server.belongsTo(models.Assessment, {
        foreignKey: 'assessmentId',
        onDelete: 'CASCADE'
      });
    }
  }
  Server.init({
    assessmentId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assessments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    model: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    user: { 
      type: DataTypes.STRING,
    },
    password: { 
      type: DataTypes.STRING,
    },
    notProvided: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    ipAddress: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    iPType: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    tagNumber: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    serialNumber: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    macAddress: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    operativeSystem: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Server',
  });
  return Server;
};