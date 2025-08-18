import express from "express";
import { 
  getServices, 
  addService, 
  updateService, 
  deleteService, 
  enquireService 
} from "../controllers/serviceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public (Customer) routes
router.get("/", getServices);
router.post("/enquire", enquireService);

// Admin CRUD routes (protected)
router.post("/", authMiddleware, addService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

export default router;
