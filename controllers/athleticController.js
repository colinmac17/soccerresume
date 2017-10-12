var db = require('../models');

module.exports = {
    updateOne: (req, res) => {
        db.athletic_stats.update(req.body,{
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    createOne: (req, res) => {
        db.athletic_stats.create(req.body)
            .then((newUser) => {
                if(newUser) {
                    res.json({created: true, message: "Athletic Info created successfully"});
                }
            }).catch(err => console.log(err));
    },
    findById: (req, res) => {
        db.athletic_stats.findOne({
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(data));
    }
}