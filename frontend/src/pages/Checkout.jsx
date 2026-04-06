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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Select Delivery Address</h2>

        <button
          onClick={() => navigate("/checkout-address")}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          + Add Address
        </button>
      </div>

      {/* ADDRESS LIST */}
      <div className="space-y-3">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="border p-3 rounded flex justify-between items-start"
          >
            <label className="cursor-pointer w-full">
              <input
                type="radio"
                name="address"
                checked={selectedAddress?._id === addr._id}
                onChange={() => setSelectedAddress(addr)}
                className="mr-2"
              />

              <strong>{addr.fullName}</strong>
              <p className="text-sm">
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-sm">📞 {addr.phone}</p>
            </label>

            <button
              onClick={() => deleteAddress(addr._id)}
              className="text-red-500 text-sm ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
      <p className="text-lg font-bold">Total: ₹{total}</p>

      <button
        onClick={placeOrder}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order (COD)
      </button>
    </div>
  );
}