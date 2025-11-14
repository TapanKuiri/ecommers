import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
 // add product
const addProduct = async (req, res) => {
    let uplodedImagesId = [];
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
                uplodedImagesId.push(result.public_id);
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
        console.log(err.message);
        if(uplodedImagesId.length  > 0){
          await Promise.all(
            uplodedImagesId.map(async (publicId) =>{
              try{
                await cloudinary.uploader.destroy(publicId);
                // console.log(`Rolled back: ${publicId}`);
              }catch(err){
                console.log("Failed to delete image ", err);
              }
            })
          )
        }
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
      .lean();  // returns plain JS objects (faster than Mongoose docs).

    // const total = await productModel.countDocuments();
    const total = await productModel.estimatedDocumentCount();


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
    console.log("productId", productId);


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
//  const relatedProducts = async (req, res) => {
//   try {
//     let { category, page = 1, limit = 2 } = req.body;

//     // convert to number (req.body values come as strings sometimes)
//     page = parseInt(page);
//     limit = parseInt(limit);
 
//     if (!category) {
//       return res.status(400).json({ success: false, message: "Category is required" });
//     }

//     const products = await productModel
//       .find(
//         { category },
//         { name: 1, image: 1, price: 1, finalPrice: 1, discount: 1, category: 1 }
//       )
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean();

 
//     const totalCount = await productModel.countDocuments({ category });

//     res.json({
//       success: true,
//       products,
//       totalCount,
//       hasMore: page * limit < totalCount,

//       // hasMore: page * limit < total,
//       // pagination: {
//       //   page,
//       //   limit,
//       //   totalPages: Math.ceil(totalCount / limit), 
//       //   totalProducts: totalCount,
//       // },
//     });
//   } catch (err) {
//     console.error("Error fetching related products:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

const relatedProducts = async (req, res) => {
  try {
    let { category, page = 1, limit = 20 } = req.body;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!category || category.length === 0) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    // If category is array, match any of them
    const categoryFilter = Array.isArray(category) ? { $in: category } : category;

    const products = await productModel
      .find(
        { category: categoryFilter },
        { name: 1, image: 1, price: 1, finalPrice: 1, discount: 1, category: 1 }
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalCount = await productModel.countDocuments({ category: categoryFilter });
    console.log("totalCount:", totalCount);

    res.json({
      success: true,
      products,
      totalCount,
      hasMore: page * limit < totalCount
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


const listAdminProducts = async (req, res) => {
  try {
    // console.log("run");

    // Await the query to get the data
    const allProducts = await productModel.find({});

    // Send plain JS objects
    res.json({ success: true, allProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export { addProduct, listProducts, removeProduct,
     singleProduct, relatedProducts,searchProduct,totalProducts,listAdminProducts }