module.exports = function (sequelize, DataTypes) {
    var HomeNews = sequelize.define("HomeNews", {
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        }
    });
    return HomeNews;
};