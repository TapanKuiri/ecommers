// drsigfzpg -- cloud name
// 741461225226537 -- api key
// BIcLi2l8OQUtQ2n9jBL8cB-sP68 -- api scret
// CLOUDINARY_URL=cloudinary://741461225226537:BIcLi2l8OQUtQ2n9jBL8cB-sP68@drsigfzpg --- api environment value


import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,

    });
}

 

export default connectCloudinary;