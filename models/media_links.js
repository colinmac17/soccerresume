//Media Links Model
module.exports = function(sequelize, DataTypes) {
    var Media_Links = sequelize.define('media_links', {
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        media_source: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        youtube_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Media_Links.associate = function(models) {
        Media_Links.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Media_Links;
};