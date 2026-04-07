import express from "express";
import  upload  from "../middleware/upload.js";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct
} from "../controllers/productController.js";


const router = express.Router();

// router.post("/add", createProduct);
router.post("/add", upload.array("images", 5),createProduct)

router.get("/", getProducts);

router.put("/update/:id", upload.array("images", 5),  updateProduct);

router.delete("/delete/:id",deleteProduct);
router.get("/:id", getSingleProduct);

export default router;
