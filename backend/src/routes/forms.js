import express from "express";
import { createForm, getAllForms, getFormById, updateForm, deleteForm } from "../controllers/formsController.js";

const router = express.Router();

router.post("/", createForm);
router.get("/", getAllForms);
router.get("/:id", getFormById);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;
