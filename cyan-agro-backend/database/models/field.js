module.exports = (sequelize, DataTypes) => {
    const Fields = sequelize.define(
        'Fields',
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            point: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false,
            }
        },
        {
            paranoid: true,
        },
    );

    Fields.associate = (models) => {
        Fields.belongsTo(models.Farms, {
            foreignKey: {
                name: 'farmId',
            },
            as: 'farm',
        });
    };

    return Fields;
};