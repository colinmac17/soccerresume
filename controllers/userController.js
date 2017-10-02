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
    findById: (req, res) => {
        db.user.findOne({
            where: {
                id: req.params.id
            }
        }).then(data => res.json(data));
    }
}