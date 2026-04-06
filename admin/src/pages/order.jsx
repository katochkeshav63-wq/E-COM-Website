import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const loadOrders = async (currentPage = 1) => {
    try {
      const res = await api.get(`/order?page=${currentPage}&limit=5`);
      setOrders(res.data.orders);
      setPages(res.data.pages);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders(page);
  }, [page]);

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/order/invoice/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/order/${id}`, { status });
      loadOrders(page);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ STATUS COLORS
  const statusColor = {
    placed: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    out_for_delivery: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusList = [
    "placed",
    "confirmed",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="flex">
      <div className="flex-1 md: ml-50 p-4 md:p-8 bg-slate-900 min-h-screen text-white">

        <h1 className="text-3xl font-bold mb-8"></h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders found</p>
        ) : (
          <>
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white text-black rounded-2xl shadow-md p-6"
                >

                  {/* 🔝 HEADER */}
                  <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <div>
                      <p className="font-semibold text-sm">
                        Order ID: {order._id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${statusColor[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* 👤 USER */}
                  <div className="text-sm text-gray-600 mb-4">
                    <p><strong>Name:</strong> {order.address?.fullName}</p>
                    <p><strong>Phone:</strong> {order.address?.phone}</p>
                    <p>
                      {order.address?.addressLine}, {order.address?.city}
                    </p>
                  </div>

                  {/* 📦 ITEMS */}
                  <div className="mb-4 space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm border-b pb-1"
                      >
                        <span>{item.productId?.title || "Product"}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* 💰 TOTAL */}
                  <div className="flex justify-between font-semibold mb-4">
                    <p>Total</p>
                    <p>₹{order.totalAmount}</p>
                  </div>

                  {/* 🔄 STATUS BUTTONS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {statusList.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(order._id, s)}
                        className={`px-3 py-1 text-xs rounded border ${
                          order.status === s
                            ? "bg-black text-white"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* 📜 TRACKING HISTORY */}
                  <div className="text-xs text-gray-500 space-y-1">
                    {order.trackingHistory?.map((h, i) => (
                      <p key={i}>
                        {h.status} →{" "}
                        {new Date(h.date).toLocaleString()}
                      </p>
                    ))}
                  </div>

                  {/* 📥 DOWNLOAD */}
                  <button
                    onClick={() => handleDownload(order._id)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Download Invoice
                  </button>
                </div>
              ))}
            </div>

            {/* 🔢 PAGINATION */}
            <div className="flex justify-center mt-10 gap-3">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-4 py-2">
                Page {page} / {pages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pages}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}