import express from "express";
const router = express.Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getAllProducts,
  getManufacturerProducts,
} from "../controllers/productController.js";
import { protect, manufacturer } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, manufacturer, createProduct);
router.get("/manufacturer/:id", protect, manufacturer, getManufacturerProducts);
router.get("/top", getTopProducts);
router.route("/all").get(getAllProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, manufacturer, updateProduct)
  .delete(protect, manufacturer, deleteProduct);

export default router;
