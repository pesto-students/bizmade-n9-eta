import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderItemStatus
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getOrders)
router.route('/').post(addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(updateOrderToPaid)
router.route('/:id/deliver').put(updateOrderToDelivered)
router.route('/:id/status').put(updateOrderItemStatus)

export default router
