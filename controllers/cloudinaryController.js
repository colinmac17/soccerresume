const cloudinary = require('cloudinary');
const config = require('../config/cloudinary');

module.exports = {
    uploadOne: (req, res) => {
        cloudinary.v2.uploader.upload(req.body, (err, res) => {
            console.log(res);
        });
    }
};

