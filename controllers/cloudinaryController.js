const cloudinary = require('cloudinary');
require('../config/cloudinary');
var LZUTF8 = require('lzutf8');

module.exports = {
    uploadOne: (req, res) => {
        cloudinary.v2.uploader.upload(req.body, (err, result) => {
            res.send(req.body, result)
        });
    },
    deleteOne: (req, res) => {
        cloudinary.v2.uploader.destroy(req.body.public_id, (error, result) => {
            if (error) console.log(error);
            console.log(result);
        });
    }
};

