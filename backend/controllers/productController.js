import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
 // add product
const addProduct = async (req, res) => {
    try{
        const {name, description, price,discount,finalPrice,  category, subCategory, bestseller} = req.body;
        // console.log("final", finalPrice)

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
            subCategory,
            price: Number(price),
            discount: Number(discount),
            finalPrice: Number(finalPrice),
            bestseller: bestseller === 'true' || bestseller === true,
            image: imageUrl,
            date: Date.now(),
            // sizes: JSON.parse(sizes) // Uncomment if you're using sizes in JSON format
        };


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
     try {
        const products = await productModel.find({},{name:1, price:1, discount:1, finalPrice:1, image:1});
        res.json({
        success: true,
        products,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
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

const relatedProducts = async (req, res)=>{
    try{
        const {category} = req.body; 
        console.log(category);
        
        const products = await productModel.find(
           { category: category },  
           { name: 1, image: 1, price: 1, finalPrice: 1, discount:1  }  
        );
        console.log(products);
        res.json({success: true, products});

    }catch(err){
      console.log(err);
    }
}


// Search products by name, description, or category
const searchProduct = async (req, res) => {
  try {
    const { search } = req.body; // { search: "shirt" }
    if (!search || search.trim() === "") {
      return res.status(400).json({ success: false, message: "Search query required" });
    }

    // Case-insensitive partial match
    const products = await productModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });

   res.json({ success: true, products });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export { addProduct, listProducts, removeProduct, singleProduct, relatedProducts,searchProduct }