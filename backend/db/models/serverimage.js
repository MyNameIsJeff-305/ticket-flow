'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServerImage extends Model {
    static associate(models) {
      ServerImage.belongsTo(models.Server, {
        foreignKey: 'serverId',
        onDelete: "CASCADE"
      });
    }
  }
  ServerImage.init({
    serverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Servers',
        key: 'id'
      },
      onDelete: "CASCADE"
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
    modelName: 'ServerImage',
  });
  return ServerImage;
};