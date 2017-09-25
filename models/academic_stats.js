//Academic Info Model
module.exports = function(sequelize, DataTypes) {
    var Academic_Stats = sequelize.define('academic_stats', {
        gpa: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2],
                not: ["[a-z]",'i']
            }
        },
        sat_score: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2],
                not: ["[a-z]",'i']
            }
        },
        act_score: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2],
                not: ["[a-z]",'i']
            }
        },
        highschool: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        ncaa_eligibility_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                len: [1]
            }
        },
        ncaa_eligibility_number: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1],
                not: ["[a-z]",'i']
            }
        }
    });
    Academic_Stats.associate = function(models) {
        Academic_Stats.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Academic_Stats;
};