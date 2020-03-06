module.exports = function (sequelize, DataTypes) {
    var HomeStock = sequelize.define("HomeStock", {
        symbol: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        }
    });
    return HomeStock;
};