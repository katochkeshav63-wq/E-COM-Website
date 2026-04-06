import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/axios";

export default function TrackOrderTimeline() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusSteps = [
    "placed",
    "confirmed",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const statusColors = {
    placed: "bg-yellow-500",
    confirmed: "bg-blue-500",
    shipped: "bg-purple-500",
    out_for_delivery: "bg-orange-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/order/track/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading order...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!order) return <p className="p-6 text-center">Order not found</p>;

  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Track Order</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <p className="mb-6 font-semibold">Order ID: {id}</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-4 left-6 w-0.5 h-full bg-gray-300"></div>

          {statusSteps.map((step, i) => {
            const isCompleted = i <= currentStep;
            const stepDate = order.history.find(h => h.status === step)?.date;

            return (
              <div key={step} className="flex items-center mb-8 relative">
                {/* Dot */}
                <div
                  className={`w-4 h-4 rounded-full z-10 ${
                    isCompleted ? statusColors[step] : "bg-gray-300"
                  }`}
                ></div>

                {/* Step info */}
                <div className="ml-4">
                  <p
                    className={`font-semibold capitalize ${
                      isCompleted ? "" : "text-gray-400"
                    }`}
                  >
                    {step.replaceAll("_", " ")}
                  </p>
                  {stepDate && (
                    <p className="text-xs text-gray-500">
                      {new Date(stepDate).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}