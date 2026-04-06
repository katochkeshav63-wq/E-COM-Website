// routes/categoryRoutes.js
import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);      // Add category
router.get("/", getCategories);        // Get all
router.delete("/:id", deleteCategory); // Delete

export default router;