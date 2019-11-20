module.exports = (sequelize, DataTypes) => {
    const Mills = sequelize.define(
        'Mills',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            paranoid: true,
        },
    );

    Mills.associate = (models) => {
        Mills.hasMany(models.Harvests, {
            as: 'harvests',
            foreignKey: 'millId',
        });
    };

    return Mills;
};