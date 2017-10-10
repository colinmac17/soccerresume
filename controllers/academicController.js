var db = require('../models');

module.exports = {
    updateOne: (req, res) => {
        db.academic_stats.update(req.body,{
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    createOne: (req, res) => {
        db.academic_stats.create(req.body)
            .then((newUser) => {
                if(newUser) {
                    res.json({created: true, message: "Academic Info created successfully"});
                }
            }).catch(err => console.log(err));
    },
    findById: (req, res) => {
        db.academic_stats.findOne({
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(data));
    }
}