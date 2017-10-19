const cloudinary = require('cloudinary');
require('../config/cloudinary');
var LZUTF8 = require('lzutf8');

module.exports = {
    uploadOne: (req, res) => {
        cloudinary.v2.uploader.upload(req.body, (err, result) => {
            res.send(req.body, result)
        });
    }
};

