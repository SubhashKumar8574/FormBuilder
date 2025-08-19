import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

// Route to get submission analytics for a specific form
router.get("/api/forms/:id/analytics", getAnalytics);

export default router;
