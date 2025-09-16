const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    static associate(models) {
      Part.hasMany(models.PartImage, {
        foreignKey: 'partId',
        onDelete: 'CASCADE'
      });
      Part.hasMany(models.PartStock, {
        foreignKey: 'partId',
        onDelete: 'CASCADE'
      });
      Part.hasMany(models.StockMovement, {
        foreignKey: 'partId',
        onDelete: 'CASCADE'
      });
    }
  }
  Part.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255)
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Generic"
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Standard"
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
    },
    unit: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'unit'
    },
    defaultPrice: {
      type: DataTypes.DECIMAL(10, 2)
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Part',
  });
  return Part;
};