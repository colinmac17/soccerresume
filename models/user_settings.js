//User Settings
module.exports = function(sequelize, DataTypes) {
    var User_Settings = sequelize.define('user_settings', {
        bAllowDownloadAsPDF: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                len: [1]
            }
        },
        bDBSearchable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                len: [1]
            }
        },
        bProfilePublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                len: [1]
            }
        }
    });
    User_Settings.associate = function(models) {
        User_Settings.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return User_Settings;
};