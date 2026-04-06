import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const res = await api.get("/order/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6"></h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm font-semibold">Order ID: {order._id}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="text-sm capitalize font-medium">{order.status}</span>
              </div>

              {/* ADDRESS */}
              <div className="text-sm text-gray-700 mb-3">
                <p><strong>Full Name:</strong> {order.address?.fullName}</p>
                <p><strong>Phone:</strong> {order.address?.phone}</p>
                <p>
                  <strong>Address:</strong>{" "}
                  {order.address?.addressLine}, {order.address?.city},{" "}
                  {order.address?.state} - {order.address?.pincode}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-3 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b pb-2">
                    <div className="flex items-center space-x-3">
                      {item.productId?.images?.[0] && (
                        <img
                          src={item.productId.images[0]}
                          alt={item.productId.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <span>{item.productId?.title || "Product"} × {item.quantity}</span>
                    </div>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold">₹{order.totalAmount}</p>

                <div className="flex gap-3">
                  <Link
                    to={`/track/${order._id}`}
                    className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Track
                  </Link>
                  <button
                    onClick={() => handleDownload(order._id)}
                    className="text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}