var db = require('../models');

module.exports = {
    updateOne: (req, res) => {
        db.user_settings.update(req.body,{
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    findById: (req, res) => {
        db.user_settings.findOne({
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(data));
    }
}