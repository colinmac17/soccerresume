var db = require('../models');

let userData = db.user.findAll({})
    .then((data) => {
        return data;
});

module.exports = {
    findAll: (req, res) => {
        db.user.findAll({
            include: [ 
                {
                    model: db.user_settings
                },
                {
                    model: db.athletic_stats
                },
                {
                    model: db.academic_stats
                },
                {
                    model: db.contact_info
                },
                {
                    model: db.additional_stats
                },
                {
                    model: db.media_links
                },
                {
                    model: db.accolades
                }
            ]
        }).then(data => res.json(data));
    },
    findByGradYear: (req, res) => {
        db.user.findAll({
            where: {
                grad_year: req.params.grad_year,
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
    findByUsername: (req, res) => {
        db.user.findOne({
            where: {
                username: req.params.username
            },
            include: [ 
                {
                    model: db.user_settings
                },
                {
                    model: db.athletic_stats
                },
                {
                    model: db.academic_stats
                },
                {
                    model: db.contact_info
                },
                {
                    model: db.additional_stats
                },
                {
                    model: db.media_links
                },
                {
                    model: db.accolades
                }
            ]
        }).then(data => res.json(data));
    },
    findByGPA: (req, res) => {
        db.academic_stats.findAll({
            where: {
                gpa: {
                    $gt: parseFloat(req.params.gpa) * 100
                }
            }
        })
    },
    advancedQuery: (req, res) => { //For advanced query just map on the front end in react
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
                    $gt: parseInt(req.params.height)
                }
            }}).then((data) => {
                userObj.athletic_stats = data;
            });
        db.academic_stats.findAll({
            where: {
                gpa: {
                    $gt: parseFloat(req.params.gpa) * 100
                },
                sat_score: {
                    $gt: parseInt(req.params.sat)
                },
                act_score: {
                    $gt: parseInt(req.params.act)
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
            },
            include: [ 
                {
                    model: db.user_settings
                },
                {
                    model: db.athletic_stats
                },
                {
                    model: db.academic_stats
                },
                {
                    model: db.contact_info
                },
                {
                    model: db.additional_stats
                },
                {
                    model: db.media_links
                },
                {
                    model: db.accolades
                }
            ]
        }).then(userData => res.json(userData));
    },
    updateOne: (req, res) => {
        db.user.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body));    
    }
}