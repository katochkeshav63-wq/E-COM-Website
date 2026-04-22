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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
    <h1 className="text-2xl sm:text-3xl font-semibold mb-10">
      Your Cart
    </h1>

    {cart.items.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <img
          src={emptyCard}
          alt="Empty Cart"
          className="w-52 h-52 object-contain mb-6 opacity-80"
        />

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Your Cart is Empty
        </h2>

        <p className="text-gray-500 mb-6">
          Start adding products to your cart
        </p>

        <button
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    ) : (
      <div className="grid lg:grid-cols-3 gap-10">

        {/* 🛍️ LEFT: CART ITEMS */}
        <div className="lg:col-span-2 space-y-5">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex flex-col sm:flex-row gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={item.productId.images?.[0]}
                alt={item.productId.title}
                className="w-full sm:w-28 h-28 object-cover rounded-lg"
              />

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹{item.productId.price}
                  </p>
                </div>

                {/* CONTROLS */}
                <div className="flex items-center justify-between mt-4">

                  {/* QTY */}
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full ">
                    <button
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity - 1)
                      }
                      className="text-lg cursor-pointer"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQty(item.productId._id, item.quantity + 1)
                      }
                      className="text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <p className="font-semibold">
                    ₹{(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500 text-sm mt-3 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💰 RIGHT: SUMMARY */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold text-black">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 rounded-full transition cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    )}
  </div>
);
}