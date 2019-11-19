module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Fields', {
        code: {type: DataTypes.STRING}
    });
};
