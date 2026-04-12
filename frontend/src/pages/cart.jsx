import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import emptyCart from "../assets/banner/empty-cart.png"

export default function Cart() {
 const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();
  const emptyCard = emptyCart

  //Load cart data
  const loadCart = async () => {
    if (!userId) return;
    const res = await api.get(`/cart/${userId}`);
    setCart(res.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  //Update item quantity
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    await api.post(`/cart/update`, { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!cart) {
    return
 
   
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

return (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
    <h1 className="text-xl sm:text-2xl font-bold mb-6">Your Cart</h1>
{cart.items.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    
    <img
      src={emptyCard}
      alt="Empty Cart"
      className="w-48 h-48 object-contain mb-6 opacity-80"
    />

    <h2 className="text-xl font-semibold text-gray-700 mb-2">
      Your Cart is Empty
    </h2>

    <p className="text-gray-500 mb-6">
      Looks like you haven't added anything yet.
    </p>

    <button
      className="px-6 cursor-pointer py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      onClick={() => navigate("/")}
    >
      Continue Shopping
    </button>

  </div>
) : 
  // your cart items UI
(
      <div className="space-y-4">

        {cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg shadow-sm"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <img
                src={item.productId.images?.[0]}
                alt={item.productId.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
              />

              <div>
                <h2 className="text-sm sm:text-base font-semibold">
                  {item.productId.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  ${item.productId.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* MIDDLE */}
            <div className="flex items-center justify-between sm:justify-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 border rounded px-2 py-1">
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>

                <span className="min-w-5 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>

              <p className="font-semibold text-sm sm:text-base">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex justify-between sm:flex-col sm:items-end gap-2 w-full sm:w-auto">
              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-500 text-sm hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* TOTAL */}
        <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Total: ${total.toFixed(2)}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    )}
  </div>
);
}