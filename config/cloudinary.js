var cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: 'soccerresume', 
    api_key: process.env.cloudinary_apiKey, 
    api_secret: process.env.cloudinary_apiSecret
});

module.exports = cloudinary.config;
  
  