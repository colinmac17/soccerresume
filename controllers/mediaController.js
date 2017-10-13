var db = require('../models');

module.exports = {
    updateOne: (req, res) => {
        db.media_links.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    createOne: (req, res) => {
        db.media_links.create(req.body)
            .then((newLink) => {
                if(newLink) {
                    res.json({created: true, message: "Media Link created successfully"});
                }
            }).catch(err => console.log(err));
    },
    deleteOne: (req, res) => {
        db.media_links.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => res.json(req.body))
    },
    findById: (req, res) => {
        db.media_links.findAll({
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(data));
    }
}