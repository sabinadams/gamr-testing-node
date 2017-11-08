module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        "sessions", {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            token: DataTypes.STRING,
            user_ID: DataTypes.INTEGER,
            creation_date: DataTypes.DATE,
            timestamp: DataTypes.DATE
        }, {
            timestamps: false,
            freezeTableName: true
        }
    );

    Session.associate = models => {
        Session.belongsTo(models.users, { foreignKey: "user_ID" });
    };

    return Session;
};