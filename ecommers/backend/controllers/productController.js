import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
// add product
const addProduct = async (req, res) => {
    try{
        const {name, description, price, category, subCategory, bestseller} = req.body;

        // console.log("body: ", req.body);

        const image1 =req.files.image1 && req.files.image1[0];
        const image2 =req.files.image2 && req.files.image2[0];      
        const image3 =req.files.image3 && req.files.image3[0];
        const image4 =req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item != undefined);

        let imageUrl = await Promise.all(
            images.map(async (image)=>{
                let result = await cloudinary.uploader.upload(image.path, {resource_type: 'image'});
                return result.secure_url;
            })
        )

        const productData = {
            name, 
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller : bestseller === 'true' ? true : false,
            // sizes : JSON.parse(sizes),
            image: imageUrl,
            date: Date.now()
        }

        // console.log(productData);

        const product = new productModel(productData);
        await product.save();
 

        res.json({success: true, message: 'Product added successfully'});

    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message}); 
    }
}

// list products
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        // console.log("products---: ", products);
        res.json({success: true, products});
    }catch(err){
        console.log("inside products")
        console.log(err);
        res.json({success: false, message: err.message});
    }
}

//removing product  
const removeProduct = async (req, res) => {
    try{
        console.log(req.body.id);
        await productModel.findByIdAndDelete(req.body.id);

        res.json({success: true, message: 'Product removed successfully'});

    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }
}

//single product info
const singleProduct = async (req, res) => {
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }