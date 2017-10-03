//User Model
module.exports = function(sequelize, DataTypes) {
    var Contact_Info = sequelize.define('contact_info', {
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
        }
    });
    Contact_Info.associate = function(models) {
        Contact_Info.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Contact_Info;
};