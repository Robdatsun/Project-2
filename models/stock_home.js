module.exports = function (sequelize, DataTypes) {
    const Stock = sequelize.define("Stock", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        }
    }, {timestamps: false});
    return Stock;
};