import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  service: { type: String, required: true },
  name: String,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Enquiry", enquirySchema);
