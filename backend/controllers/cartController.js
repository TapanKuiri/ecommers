import userModel from "../models/userModel.js";


// add products to user cart
const addToCart = async (req, res) => {
  try {
    // const userId = req.user.userId; // Extracted from token by auth middleware
    const { itemId, userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData.set(itemId, cartData[itemId] + 1);
    } else {
      cartData.set(itemId, 1);
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


//update user cart
const updateCart = async (req, res) => {
  try {
    // const userId = req.user.userId; // From token
    const { itemId, userId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (quantity === 0) {
      cartData.delete(itemId);
    } else {
      cartData.set(itemId, quantity);
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (err) {
    console.error("Update cart error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


//get user cart data
// const getUserCart = async (req, res)=>{
//     try{

//         const {userId} = req.body;
//         // console.log("user id is: ",userId);

//         const userData = await userModel.findById(userId);
//         // let cartData = await userData.cartData;
//         console.log("user data is: ",userData);

//         res.json({success: true, cartData});

//     }catch(err){
//         console.log(err);
//         res.json({success: false, message: err.message});
//     }
// }

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    const cartData = userData.cartData || {}; // ✅ define cartData
    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export {addToCart, updateCart, getUserCart}; 