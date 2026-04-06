import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],

    address: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },

    totalAmount: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    // 🔥 IMPROVED STATUS
    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },

    // 🔥 TRACKING HISTORY (IMPORTANT)
    trackingHistory: [
      {
        status: String,
        date: { type: Date, default: Date.now },
      },
    ],

    // 🔥 OPTIONAL (PRO FEATURE)
    trackingId: String,
    courier: String,

  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);