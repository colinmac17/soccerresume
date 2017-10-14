var db = require('../models');

module.exports = {
    updateOne: (req, res) => {
        db.contact_info.update(req.body,{
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(req.body));
    },
    createOne: (req, res) => {
        db.contact_info.create(req.body)
            .then((newLink) => {
                if(newLink) {
                    res.json({created: true, message: "Contact info created successfully"});
                }
            }).catch(err => console.log(err));
    },
    findById: (req, res) => {
        db.contact_info.findOne({
            where: {
                userId: req.params.id
            }
        }).then(data => res.json(data));
    }
}