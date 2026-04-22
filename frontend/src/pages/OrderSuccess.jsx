import { useNavigate, useParams } from "react-router";

export default function OrderSuccess() {
  const { id } = useParams();
const navigate = useNavigate()
  const goHome = () => {
    navigate ("/");
  };
  const goTrack = () => {
    navigate ("/my-orders");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8] px-4">
      
      <div className="bg-white max-w-md w-full rounded-2xl shadow-md p-8 text-center">

        {/* ✅ SUCCESS ICON */}
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-green-100 mb-6">
          <span className="text-4xl text-green-600">✓</span>
        </div>

        {/* 🎉 TITLE */}
        <h1 className="text-2xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-2">
          Thank you for your purchase. Your order is confirmed.
        </p>

        {/* 📦 ORDER CARD */}
        <div className="bg-gray-50 rounded-xl p-4 mt-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800 break-all">
            {id}
          </p>
        </div>

        {/* 🚀 ACTIONS */}
        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={goHome}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition cursor-pointer"
          >
            Continue Shopping
          </button>

          <button
            onClick={goTrack}
            className="w-full border border-gray-300 py-3 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            Track Order
          </button>

        </div>

        {/* 💡 FOOTER */}
        <p className="text-xs text-gray-400 mt-6">
          You will receive order updates via phone/email
        </p>

      </div>
    </div>
  );
}