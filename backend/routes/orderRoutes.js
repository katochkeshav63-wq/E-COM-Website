import express from "express"
import Order from "../models/Order.js";
import { placeOrder, allOrder,downloadInvoice,updateOrderStatus, getUserOrders,
  trackOrder} from "../controllers/orderController.js"
import { authMiddleware, protect } from "../middleware/auth.js";

const router = express.Router()



router.post("/place", protect, placeOrder)
// GET /api/orders/recent
router.get("/recent", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name")
      .populate("items.productId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/",allOrder)
router.get("/my-orders", authMiddleware ,getUserOrders)
router.get("/track/:id",trackOrder)
router.get("/invoice/:id", downloadInvoice);
router.put("/:id", updateOrderStatus);
export default router
