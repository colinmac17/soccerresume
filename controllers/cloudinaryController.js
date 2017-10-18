const cloudinary = require('cloudinary');
const config = require('../config/cloudinary');
var LZUTF8 = require('lzutf8');

module.exports = {
    uploadOne: (req, res) => {
        cloudinary.v2.uploader.upload(req.body.imgCode, (err, res) => {
            console.log(res);
        });
    }
};

