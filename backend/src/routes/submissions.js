import { createSubmission, getSubmissions } from "../controllers/submissionsController.js";
import express from "express";

const router = express.Router();

// Create a new submission
router.post("/api/forms/:id/submissions", createSubmission);

// Retrieve submissions for a specific form
router.get("/api/forms/:id/submissions", getSubmissions);

export default router;
