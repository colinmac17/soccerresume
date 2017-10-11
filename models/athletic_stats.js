//Athletic Info Model
module.exports = function(sequelize, DataTypes) {
    var Athletic_Stats = sequelize.define('athletic_stats', {
        club_team: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        primary_position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        position_2: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2]
            }
        },
        height_inches: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                not: ["[a-z]",'i']
            }
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1],
                not: ["[a-z]",'i']
            }
        },
        coach_contact_name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        coach_contact_email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [5],
                isEmail: true
            }
        },
        commitment_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                len: [1]
            }
        },
        commitment_school: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        }
    });
    Athletic_Stats.associate = function(models) {
        Athletic_Stats.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Athletic_Stats;
};