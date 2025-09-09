const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {
    static associate(models) {
      // define association here
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