import userModel from "../models/userModel.js";
import serviceModel from "../models/serviceModel.js";
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

const placeService = async (req, res) => {
  try {
    const { userId, address, productName, problemDescription } = req.body;

    if (!userId || !productName || !problemDescription || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const serviceData = {
      userId,
      productName,
      problemDescription,
      address,
      date: Date.now(),
    };

    const newService = new serviceModel(serviceData);
    console.log("New Repair Data:", newService);
    await newService.save();

    res.json({ success: true, message: "Service request submitted successfully!" });
  } catch (err) {
    console.error("Service Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listService = async (req, res)=>{
 try{
          const service = await serviceModel.find({});
          res.json({success: true, service});
     }catch(err){
          console.log(err);
          res.json({success: false, message: err.message});
     }
}

const cancelService = async (req, res) => {
  try{
    const {serviceId} = req.body;
    if(!serviceId){
      return res.status(500).json({success: false, message: "Service ID is required"});
    }

    const service = await serviceModel.findById(serviceId);
    if(!service){
      return res.status(404).json({success: false, message: "Service not found"});
    }
    if(service.status === 'Delevered' || service.status === 'Completed'){
      return res.status(400).json({success: false, message: "Cannot cancel a completed service"});
    }
    if(service.status === 'Cancelled'){
      return res.status(400).json({success: false, message: "Service is already cancelled"});
    }
    service.status = 'Cancelled';
    await service.save();
     return res.status(200).json({
      success: true,
      message: "Service cancelled successfully",
      service
    });

  }catch(err){
    console.error("Error", err);
    res.status(500).json({success: false, message: "Internal server error"});
  }
}

const statusService = async (req, res)=>{
  try{
    const {orderId, status} = req.body;
    if(!orderId || !status){
      return res.status(400).json({success: false, message: "Order ID and status are required"});
    }
    const service = await serviceModel.findById(orderId);
    if(!service){
      return res.status(404).json({success: false, message: "Service not found"});
    }
    if(service.status === "Delivered"){
      return res.status(400).json({success: false, message: "Cannot change status of a completed service"});
    }
    service.status = status;
    await service.save();
    return res.status(200).json({
      success: true,
      message: "Service status updated successfully",
      service
    });
  }catch(err){
    console.error("Error", err);
    res.status(500).json({success: false, message: "Internal server error"});
  }
}

export { placeService,listService, cancelService, statusService};
