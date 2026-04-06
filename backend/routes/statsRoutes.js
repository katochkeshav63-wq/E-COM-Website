import express from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

   const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    const monthlyRevenue = await Order.aggregate([
  {
    $match: {
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    }
  },
  {
    $group: {
      _id: { $dayOfMonth: "$createdAt" },
      revenue: { $sum: "$totalAmount" }
    }
  },
  { $sort: { _id: 1 } }
]);
// console.log(monthlyRevenue)

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      monthlyRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;