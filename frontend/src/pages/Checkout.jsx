import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  // ✅ LOAD DATA
  const loadData = async () => {
    try {
      if (!userId) return;

      const cartRes = await api.get(`/cart/${userId}`);
      setCart(cartRes.data);

      const addrRes = await api.get(`/address/${userId}`);
      setAddresses(addrRes.data);
      setSelectedAddress(addrRes.data[0] || null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data ❌");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ DELETE ADDRESS WITH TOAST
  const deleteAddress = async (id) => {
    try {
      await toast.promise(
        api.delete(`/address/${id}`),
        {
          pending: "Deleting address...",
          success: "Address deleted 🗑️",
          error: "Delete failed ❌",
        }
      );

      loadData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!userId) {
    return <div className="p-6 text-center">Please login first</div>;
  }

  if (!cart) return <div className="p-6">Loading...</div>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  // ✅ PLACE ORDER WITH TOAST
  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select address ❌");
      return;
    }

    try {
      const res = await toast.promise(
        api.post("/order/place", {
          userId,
          address: selectedAddress,
        }),
        {
          pending: "Placing order...",
          success: "Order placed successfully 🎉",
          error: "Order failed ❌",
        }
      );

      navigate(`/OrderSuccess/${res.data.orderId}`);
    } catch (err) {
      console.error(err);
    }
  };
return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
    <h1 className="text-2xl sm:text-3xl font-semibold mb-10">
      Checkout
    </h1>

    <div className="grid lg:grid-cols-3 gap-10">

      {/* 📦 LEFT: ADDRESS */}
      <div className="lg:col-span-2">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Delivery Address
          </h2>

          <button
            onClick={() => navigate("/checkout-address")}
            className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 cursor-pointer"
          >
            + Add New
          </button>
        </div>

        {/* ADDRESS LIST */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-5 rounded-xl border cursor-pointer transition ${
                selectedAddress?._id === addr._id
                  ? "border-black bg-gray-50"
                  : "bg-white hover:shadow"
              }`}
              onClick={() => setSelectedAddress(addr)}
            >
              <div className="flex justify-between items-start">

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => setSelectedAddress(addr)}
                    />
                    <h3 className="font-semibold">
                      {addr.fullName}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600">
                    {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    📞 {addr.phone}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAddress(addr._id);
                  }}
                  className="text-red-500 text-sm hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 💰 RIGHT: SUMMARY */}
      <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">

        <h2 className="text-xl font-semibold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4 text-sm">

          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex justify-between text-gray-600"
            >
              <span className="line-clamp-1">
                {item.productId.title} × {item.quantity}
              </span>

              <span>
                ₹
                {(item.productId.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-medium">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 rounded-full transition cursor-pointer"
        >
          Place Order (Cash on Delivery)
        </button>

        <p className="text-xs text-gray-400 mt-3 text-center ">
          Safe & secure checkout
        </p>
      </div>

    </div>
  </div>
);
}