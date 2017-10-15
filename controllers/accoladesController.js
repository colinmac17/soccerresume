var db = require('../models');

module.exports = {
    updateOne: (req, res) => {
        db.accolades.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    createOne: (req, res) => {
        db.accolades.create(req.body)
            .then((newLink) => {
                if(newLink) {
                    res.json({created: true, message: "Accolade created successfully"});
                }
            }).catch(err => console.log(err));
    },
    deleteOne: (req, res) => {
        db.accolades.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body))
    },
    findById: (req, res) => {
        db.accolades.findAll({
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(data));
    }
}