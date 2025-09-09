'use strict';
module.exports = (sequelize, DataTypes) => {
  const Part = sequelize.define('Part', {
    sku: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: DataTypes.STRING(255),
    unit: { type: DataTypes.STRING(20), allowNull: false },
    defaultPrice: DataTypes.DECIMAL(10, 2),
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'Parts' });

  Part.associate = models => {
    Part.hasMany(models.PartImage, { foreignKey: 'partId', as: 'images' });
    Part.hasMany(models.PartStock, { foreignKey: 'partId', as: 'stocks' });
    Part.hasMany(models.StockMovement, { foreignKey: 'partId', as: 'movements' });
    Part.hasMany(models.TicketPart, { foreignKey: 'partId', as: 'ticketLines' });
  };

  return Part;
};