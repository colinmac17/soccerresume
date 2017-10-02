const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require('../models');

let userData = db.user.findAll({})
    .then((data) => {
        return data;
});

module.exports = {
    findAll: (req, res) => {
        db.user.findAll({})
            .then(data => res.json(data));
    },
    findByGradYear: (req, res) => {
        db.user.findAll({
            where: {
                grad_year: {
                    [Op.gt]: req.params.grad_year
                },
                user_type: "1"
            }
        }).then(data => res.json(data));
    },
    findByPosition: (req, res) => {
        db.athletic_stats.findAll({
            where: {
                primary_position: req.params.position
            }
        }).then(data => res.json(data));
    },
    findByGPA: (req, res) => {
        db.academic_stats.findAll({
            where: {
                gpa: {
                    [Op.gt]: parseFloat(req.params.gpa) * 100
                }
            }
        })
    },
    advancedQuery: (req, res) => {
        let userObj = {};
        db.user.findAll({
            where: {
                grad_year: req.params.grad_year,
                user_type: "1"
            }
        }).then((data) => {
            userObj.user = data;
        });
        db.athletic_stats.findAll({
            where: {
                primary_position: req.params.position,
                commitment_status: req.params.commitment_status,
                height_feet: {
                    [Op.gt]: parseInt(req.params.height)
                }
            }}).then((data) => {
                userObj.athletic_stats = data;
            });
        db.academic_stats.findAll({
            where: {
                gpa: {
                    [Op.gt]: parseFloat(req.params.gpa) * 100
                },
                sat_score: {
                    [Op.gt]: parseInt(req.params.sat)
                },
                act_score: {
                    [Op.gt]: parseInt(req.params.act)
                },
                ncaa_eligibility_status: req.params.eligibility
            }
        }).then((data) => {
            userObj.academic_stats = data;
            res.json(userObj);
        });
    },
    findById: (req, res) => {
        db.user.findOne({
            where: {
                id: req.params.id
            }
        }).then(data => res.json(data));
    },
    updateOne: (req, res) => {
        db.user.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    isLoggedIn: (req, res) => {
        if (req.isAuthenticated()) {
            return true
        } else {
            return false;
        }
    }
}