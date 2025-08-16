import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  userId: { type: Object, required: true },
  productName: { type: String, required: true },
  problemDescription: { type: String, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: 'service Requested' },
  date: { type: Number, required: true }
});

const serviceModel = mongoose.models.service || mongoose.model("service", serviceSchema);
export default serviceModel;
