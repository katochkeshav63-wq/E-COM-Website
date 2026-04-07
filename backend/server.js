import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();

// ✅ Allowed origins
// const allowedOrigins = [
//   "https://e-com-website-4.onrender.com",
//   "https://e-com-website-5.onrender.com",
//   "https://myfrontend.com"
// ];

// ✅ CORS FIRST (very important)
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.use(cors())
// ✅ Handle preflight requests
// app.options("*", cors());

// Middlewares
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// ✅ Routes (AFTER CORS)
app.use("/", statsRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/categories", categoryRoutes);
// app.use("/api/", orderRoutes)

app.get("/", (req, res) => {
  res.send("API is running...");
});

// DB
connectDB();

// Server
app.listen(5000, () => {
  console.log("server is running on 5000");
});