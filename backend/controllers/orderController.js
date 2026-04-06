import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import PDFDocument from "pdfkit";

export const placeOrder = async (req, res) => {
  try {
    const { address } = req.body;

    // ✅ ALWAYS use token user
    const userId = req.user._id;

    // 🔍 Get cart using SAME userId
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 🧾 Prepare order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    // 💰 Total
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // 📉 Deduct stock
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // 🧾 Create order (SAME userId)
    const order = await Order.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
      status: "placed",
      trackingHistory: [
        {
          status: "placed",
          date: new Date(),
        },
      ],
    });

    // 🧹 Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const allOrder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();

    const orders = await Order.find()
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    res.json({
      orders,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};



export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.productId", "title");

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    doc.pipe(res);

    // 🏢 COMPANY HEADER
    doc
      .fontSize(20)
      .text("BAGPACK STORE", { align: "left" })
      .fontSize(10)
      .text("Delhi, India")
      .text("Email: support@store.com")
      .moveDown();

    // 🧾 INVOICE TITLE
    doc
      .fontSize(18)
      .text("INVOICE", { align: "right" })
      .moveDown();

    // 📦 ORDER INFO
    doc
      .fontSize(10)
      .text(`Invoice ID: INV-${order._id}`)
      .text(`Order ID: ${order._id}`)
      .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
      .moveDown();

    // 👤 CUSTOMER INFO
    doc
      .fontSize(12)
      .text("Bill To:", { underline: true })
      .fontSize(10)
      .text(order.address.fullName)
      .text(order.address.phone)
      .text(
        `${order.address.addressLine}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
      )
      .moveDown();

    // 🛍️ TABLE HEADER
    doc.fontSize(11).text("Items", { underline: true });
    doc.moveDown(0.5);

    const tableTop = doc.y;

    // Columns
    doc.text("Product", 50, tableTop);
    doc.text("Qty", 300, tableTop);
    doc.text("Price", 350, tableTop);
    doc.text("Total", 450, tableTop);

    doc.moveDown();

    let totalAmount = 0;

    // 🛒 ITEMS
    order.items.forEach((item, i) => {
      const y = doc.y;

      const itemTotal = item.quantity * item.price;
      totalAmount += itemTotal;

      doc.text(item.productId?.title || "Product", 50, y);
      doc.text(item.quantity.toString(), 300, y);
      doc.text(`₹${item.price}`, 350, y);
      doc.text(`₹${itemTotal}`, 450, y);

      doc.moveDown();
    });

    doc.moveDown();

    // 💰 SUMMARY
    const tax = totalAmount * 0.18; // 18% GST
    const grandTotal = totalAmount + tax;

    doc.moveDown();
    doc.text(`Subtotal: ₹${totalAmount}`, { align: "right" });
    doc.text(`GST (18%): ₹${tax.toFixed(2)}`, { align: "right" });
    doc
      .fontSize(12)
      .text(`Total: ₹${grandTotal.toFixed(2)}`, { align: "right" });

    doc.moveDown(2);

    // 📝 FOOTER
    doc
      .fontSize(10)
      .text("Thank you for your purchase!", { align: "center" })
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error generating invoice" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    order.status = status;

    order.trackingHistory.push({
      status,
      date: new Date(),
    });

    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.json({
      status: order.status,
      history: order.trackingHistory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("items.productId", "title images price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
