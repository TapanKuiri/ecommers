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

const listProducts = async(req, res)=>{

 
try {
    let { page, limit } = req.body;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    const skip = (page - 1) * limit;

    const products = await productModel
      .find(
        {}, // no filter, fetch all
        { name: 1, price: 1, discount: 1, finalPrice: 1, image: 1 } // only necessary fields
          // { name: 1,  image: 1 } 
      )
      .skip(skip)
      .limit(limit)
      // .sort({ createdAt: -1 });
      // console.log(products);

    const total = await productModel.countDocuments();

    res.json({
      success: true,
      products,
      total,
      hasMore: page * limit < total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
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
  try {
    const { productId } = req.body;


    // Use findById for single product
    const product = await productModel.findById(
      productId,
      { name: 1, image: 1, price: 1, finalPrice: 1, discount: 1, description: 1, category: 1 }
    );

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};


// controllers/productController.js
 const relatedProducts = async (req, res) => {
  try {
    let { category, page = 1, limit = 20 } = req.body;

    // convert to number (req.body values come as strings sometimes)
    page = parseInt(page);
    limit = parseInt(limit);
 
    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }


    const products = await productModel
      .find(
        { category },
        { name: 1, image: 1, price: 1, finalPrice: 1, discount: 1, category: 1 }
      )
      .skip((page - 1) * limit)
      .limit(limit);

 
    const totalCount = await productModel.countDocuments({ category });

    res.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
        totalProducts: totalCount,
      },
    });
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Search products by name, description, or category
const searchProduct = async (req, res) => {
  try {
    const { search } = req.body; // { search: "shirt" }
    if (!search || search.trim() === "") {
      return res.status(400).json({ success: false, message: "Search query required" });
    }

    // Case-insensitive partial match
   const products = await productModel.find({
      name: { $regex: search, $options: "i" }
    });

    


   res.json({ success: true, products });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const totalProducts = async (req, res) => {
  try {
    const count = await productModel.countDocuments(); // counts all products
    return res.json({ success: true, count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};




export { addProduct, listProducts, removeProduct,
     singleProduct, relatedProducts,searchProduct,totalProducts }