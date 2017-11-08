module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "users", {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            display_name: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            salt: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
            reset_token: DataTypes.STRING, // Token for reset password function
            reset_timestamp: DataTypes.DATE,
            tag: DataTypes.STRING, // @tag
            bio: DataTypes.STRING,
            profile_pic: DataTypes.STRING, // URL
            banner_pic: DataTypes.STRING, // URL
            exp_count: DataTypes.INTEGER,
            level: DataTypes.INTEGER,
            profile_access: DataTypes.INTEGER, // Who can see your profile
            post_access: DataTypes.INTEGER, // Who can see your posts
            two_step: DataTypes.BOOLEAN,
            creation_date: DataTypes.DATE,
            timestamp: DataTypes.DATE
        }, {
            timestamps: false,
            freezeTableName: true
        }
    );

    User.associate = models => {
        User.hasMany(models.sessions, { foreignKey: "user_ID" });
    };

    return User;
};