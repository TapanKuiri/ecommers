import userModel from "../models/userModel.js";
import repairModel from "../models/repairModel.js";
// const productData = async (req, res) => {
//   try {
//     const {userId, productName, problemDescription } = req.body;

//     const user = await userModel.findById(userId);
//     if(!user) return res.status(404).json({error: "User not found"});
//     const newRepair  = {
//       productName,
//       problemDescription,
//       date: new Date()
//     }
//     user.repair.push(newRepair);
//     await user.save();
//     // console.log("user:", user);

//     res.status(200).json({ message: "Product data received successfully." });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const repairData = async (req, res)=>{
//   try{
//       const repairData = await orderModel.find({});
//       res.json({success: true, orders});
// }catch(err){
//     console.error("Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

const placeRepair = async (req, res) => {
  try {
    const { userId, address, productName, problemDescription } = req.body;

    if (!userId || !productName || !problemDescription || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const repairData = {
      userId,
      productName,
      problemDescription,
      address,
      date: Date.now(),
    };

    const newRepair = new repairModel(repairData);
    console.log("New Repair Data:", newRepair);
    await newRepair.save();

    res.json({ success: true, message: "Repair request submitted successfully!" });
  } catch (err) {
    console.error("Repair Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listRepair = async (req, res)=>{
 try{
          const repair = await repairModel.find({});
          res.json({success: true, repair});
     }catch(err){
          console.log(err);
          res.json({success: false, message: err.message});
     }
}

export { placeRepair,listRepair };
