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
            }
            // include: [
            //     // {model: db.academic_stats},
            //     {model: db.athletic_stats},
            //     {model: db.contact_info},
            //     {model: db.accolades},
            //     {model: db.media_links},
            //     {model: db.user_settings},
            //     {model: db.academic_stats} 
            // ]
        }).then(userData => {
            res.json(userData);
            // const resObj = userData.map(user => {
            //     return Object.assign(
            //         {},
            //         {
            //             id: user.id,
            //             username: user.username,
            //             email: user.email,
            //             first_name: user.first_name,
            //             last_name: user.last_name,
            //             grad_year: user.grad_year,
            //             user_type: user.user_type,
            //             user_plan: user.user_plan,
            //             settings: user.user_settings.map(setting => {
            //                 return Object.assign(
            //                     {},
            //                     {
            //                         bAllowDownloadAsPDF: setting.bAllowDownloadAsPDF,
            //                         bDBSearchable: setting.bDBSearchable,
            //                         bProfilePublic: setting.bProfilePublic
            //                     }
            //                 )
            //             })
            //         }
            //     )
            // })
        })
    },
    updateOne: (req, res) => {
        db.user.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body));
    }
}