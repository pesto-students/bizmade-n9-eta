import express from "express";
const router = express.Router();
import {
  getwishlistItems,
  addToWishlist,
  deleteWishlistItem,
} from "../controllers/wishlistController.js";
import { protect, manufacturer } from "../middleware/authMiddleware.js";

router.route("/").get(getwishlistItems);
router.route("/:id").get(deleteWishlistItem);
router.route("/product/:id").post(protect, addToWishlist);

export default router;
