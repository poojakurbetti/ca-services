import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEnquiryEmail = async ({ serviceName, customerEmail, customerPhone }) => {
  try {
    await transporter.sendMail({
      from: `"CA Services" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // receive enquiry in your admin email
      subject: `New Service Enquiry: ${serviceName}`,
      text: `You have a new enquiry for ${serviceName}\n\nEmail: ${customerEmail}\nPhone: ${customerPhone}`,
    });
    console.log("✅ Enquiry email sent successfully");
  } catch (err) {
    console.error("❌ Failed to send enquiry email:", err);
    throw err;
  }
};
