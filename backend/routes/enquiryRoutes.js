import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

// Customer creates enquiry
router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin views enquiries (protected)
import { authMiddleware } from "../middleware/authMiddleware.js";
router.get("/", authMiddleware, async (req, res) => {
  const enquiries = await Enquiry.find();
  res.json(enquiries);
});

export default router;
