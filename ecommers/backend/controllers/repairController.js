import userModel from "../models/userModel.js";

const productData = async (req, res) => {
  try {
    const {userId, productName, problemDescription } = req.body;

    const user = await userModel.findById(userId);
    if(!user) return res.status(404).json({error: "User not found"});
    const newRepair  = {
      productName,
      problemDescription,
      date: new Date()
    }
    user.repair.push(newRepair);
    await user.save();
    // console.log("user:", user);

    res.status(200).json({ message: "Product data received successfully." });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { productData };
