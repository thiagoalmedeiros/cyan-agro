module.exports = (sequelize, DataTypes) => {
    const Farms = sequelize.define(
        'Farms',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            paranoid: true,
        },
    );

    Farms.associate = (models) => {
        Farms.belongsTo(models.Harvests, {
            foreignKey: {
                name: 'harvestId',
            },
            as: 'harvest',
        });
        Farms.hasMany(models.Fields, {
            as: 'fields',
            foreignKey: 'farmId',
        });
    };

    return Farms;
};