module.exports = (sequelize, DataTypes) => {
    const Harvests = sequelize.define(
        'Harvests',
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            paranoid: true,
        },
    );

    Harvests.associate = (models) => {
        Harvests.belongsTo(models.Mills, {
            foreignKey: {
                name: 'millId',
            },
            as: 'mill',
        });

        Harvests.hasMany(models.Farms, {
            as: 'farms',
            foreignKey: 'harvestId',
        });
    };

    return Harvests;
};