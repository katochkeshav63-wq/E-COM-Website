import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    // console.log(Product.countDocuments())
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    

const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
    });
//     const latestOrders = await Order.find()
//   .sort({ createdAt: -1 })
//   .limit(5);

// res.json({
//   totalProducts,
//   totalUsers,
//   totalOrders,
//   totalRevenue,
//   latestOrders,
// });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;