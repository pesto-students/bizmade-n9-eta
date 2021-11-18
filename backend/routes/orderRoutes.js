import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getManufacturerOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, manufacturer } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/manufacturer/:id").get(protect, getManufacturerOrders);
router.route("/").put(protect, updateOrderStatus);
router.route("/myorders/:id").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/deliver").put(updateOrderToDelivered);

export default router;
