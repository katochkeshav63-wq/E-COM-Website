import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "", // ✅ FIXED
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    try {
      await api.post("/address/add", {
        ...form,
        userId,
      });

      navigate("/checkout");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      ))}

      <button
        onClick={saveAddress}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Save Address
      </button>
    </div>
  );
}