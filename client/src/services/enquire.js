import express from "express";
import { sendEnquiryEmail } from "../utils/mailer.js";

const router = express.Router();

router.post("/enquire", async (req, res) => {
  const { serviceName, email, phone } = req.body;

  try {
    await sendEnquiryEmail({ serviceName, customerEmail: email, customerPhone: phone });
    res.json({ success: true, message: `Enquiry sent for ${serviceName}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to send enquiry email" });
  }
});

export default router;
