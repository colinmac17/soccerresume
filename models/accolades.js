//Accolades Model
module.exports = function(sequelize, DataTypes) {
    var Accolades = sequelize.define('accolades', {
        accolade_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        year_achieved: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    });
    Accolades.associate = function(models) {
        Accolades.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Accolades;
};