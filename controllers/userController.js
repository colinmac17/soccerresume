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
        }).then(data => res.json(data)).catch(err => {
            res.json({
                message: err.errors[0].message,
                errors: err
            });
        });
    },
    findByGradYear: (req, res) => {
        db.user.findAll({
            where: {
                grad_year: req.params.grad_year,
                user_type: "1"
            }
        }).then(data => res.json(data)).catch(err => {
            res.json({
                message: err.errors[0].message,
                errors: err
            });
        });
    },
    findByPosition: (req, res) => {
        db.athletic_stats.findAll({
            where: {
                primary_position: req.params.position
            }
        }).then(data => res.json(data)).catch(err => {
            res.json({
                message: err.errors[0].message,
                errors: err
            });
        });
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
        }).then(data => res.json(data)).catch(err => {
            res.json({
                message: err.errors[0].message,
                errors: err
            });
        });
    },
    findByGPA: (req, res) => {
        db.academic_stats.findAll({
            where: {
                gpa: {
                    $gt: parseFloat(req.params.gpa) * 100
                }
            }
        }).then(userData => res.json(userData)).catch(err => {
            res.json({
                message: err.errors[0].message,
                errors: err
            });
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
        }).then(userData => res.json(userData)).catch(err => {
            res.json({
                message: err.errors[0].message,
                errors: err
            })
        });
    },
    updateOne: (req, res) => {
        db.user.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body)).catch(err => {
            if (err.errors[0].message = 'username must be unique') {
                res.json({
                    message: 'That username is already taken',
                    errors: err
                });
            }
        }); 
    }
}