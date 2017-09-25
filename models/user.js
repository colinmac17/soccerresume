//User Model
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [7],
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
                not: ["[a-z]",'i']
            }
        },
        twitter_handle: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2]
            }
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
                not: ["[a-z]",'i']
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        home_city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        home_state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        grad_year: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        user_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_plan: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    User.associate = function(models) {
        User.hasOne(models.academic_stats, {
            //if a user is deleted, delete all of their results
            onDelete: "cascade"
        });
        User.hasOne(models.athletic_stats, {
            //if a user is deleted, delete all of their results
            onDelete: "cascade"
        });
        User.hasOne(models.user_settings, {
            //if a user is deleted, delete all of their results
            onDelete: "cascade"
        });
        User.hasMany(models.media_links, {
            //if a user is deleted, delete all of their results
            onDelete: "cascade"
        });
        User.hasMany(models.accolades, {
            //if a user is deleted, delete all of their results
            onDelete: "cascade"
        });
        User.hasMany(models.additional_stats, {
            //if a user is deleted, delete all of their results
            onDelete: "cascade"
        });
    };
    return User;
};