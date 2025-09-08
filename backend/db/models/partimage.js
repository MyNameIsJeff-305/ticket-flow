'use strict';
module.exports = (sequelize, DataTypes) => {
    const PartImage = sequelize.define('PartImage', {
        partId: { type: DataTypes.INTEGER, allowNull: false },
        partImageURL: { type: DataTypes.STRING(200), allowNull: false },
        description: DataTypes.STRING(255)
    }, { tableName: 'PartImages', timestamps: true, createdAt: 'createdAt', updatedAt: false });

    PartImage.associate = models => {
        PartImage.belongsTo(models.Part, { foreignKey: 'partId', as: 'part' });
    };

    return PartImage;
};
