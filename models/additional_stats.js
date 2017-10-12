//Additional Stats Model
module.exports = function(sequelize, DataTypes) {
    var Additional_Stats = sequelize.define('additional_stats', {
        additional_description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        additional_category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    Additional_Stats.associate = function(models) {
        Additional_Stats.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Additional_Stats;
};