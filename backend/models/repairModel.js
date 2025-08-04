import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
  userId: { type: Object, required: true },
  productName: { type: String, required: true },
  problemDescription: { type: String, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: 'Repair Requested' },
  date: { type: Number, required: true }
});

const repairModel = mongoose.models.repair || mongoose.model("repair", repairSchema);
export default repairModel;
