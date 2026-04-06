import { useEffect, useState } from "react";
import { getAllStats } from "../services/statsService";
import { getRecentOrders } from "../services/orderServices";
import { useData } from "../hooks/useData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

/* ─── Status Badge ─── */
const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-400/30",
    completed: "bg-green-500/10 text-green-400 border-green-400/30",
    cancelled: "bg-red-500/10 text-red-400 border-red-400/30"
  };

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${colors[status]}`}>
      {status}
    </span>
  );
};

/* ─── Card ─── */
const Card = ({ label, value }) => (
  <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-xl p-5 shadow hover:shadow-lg transition">
    <p className="text-sm text-slate-400 mb-1">{label}</p>
    <h2 className="text-2xl font-bold text-white">{value}</h2>
  </div>
);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    dispatch,

    totalProducts,
    totalOrders,
    totalRevenue,
    monthlyRevenue,
    totalUsers,
    loading
  } = useData();

  const revenueChart =
  monthlyRevenue?.map((item) => ({
    day: item._id,
    revenue: item.revenue
  })) || [];

  const loadStats = async () => {
    try {
      dispatch({ type: "LOADING_START" });
      const data = await getAllStats();
      dispatch({ type: "GET_ALL_STATS", payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await getRecentOrders();
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStats();
    loadOrders();
  }, []);

  const handleLogout = () => {
   
    localStorage.clear();
 
    window.location.href = "https://e-com-website-5.onrender.com/";
  };

  const filteredOrders = orders
    .map((o) => ({
      id: o._id,
      customer: o.userId?.name || "User",
      product: o.products?.[0]?.productId?.title || "Product",
      amount: o.totalAmount,
      status: o.status?.toLowerCase()
    }))
    .filter(
      (o) =>
        o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
<div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 text-white  lg:ml-40">

  {/* 🔹 HEADER */}
  <div className="sticky top-0 z-20 bg-slate-900/70 backdrop-blur-md border-b border-slate-800 ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">

      <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
       
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">

        <input
          type="text"
          placeholder="Search orders..."
          className="w-full sm:w-auto px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          onClick={handleLogout}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">

    {/* 🔹 STATS */}
    {loading ? (
      <p className="text-slate-400">Loading...</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <Card label="Products" value={totalProducts} />
        <Card label="Orders" value={totalOrders} />
        <Card label="Users" value={totalUsers} />
        <Card label="Revenue" value={totalRevenue} />
      </div>
    )}

    {/* 🔹 CHART */}
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 sm:p-6 shadow">
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Revenue This Month
      </h2>

      <div className="w-full h-62.5 sm:h-75">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* 🔹 ORDERS TABLE */}
    <div className="bg-slate-800/70 border border-slate-700 rounded-xl shadow overflow-hidden">
      
      <div className="px-4 sm:px-6 py-4 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="font-semibold">Recent Orders</h2>
        <span className="text-xs sm:text-sm text-slate-400">
          {filteredOrders.length} results
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-150">
          <thead className="bg-slate-900/50 text-slate-400">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left">Order ID</th>
              <th className="px-4 sm:px-6 py-3 text-left">Customer</th>
              <th className="px-4 sm:px-6 py-3 text-left">Product</th>
              <th className="px-4 sm:px-6 py-3 text-right">Amount</th>
              <th className="px-4 sm:px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-slate-400">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((o, i) => (
                <tr
                  key={o.id}
                  className={`border-t border-slate-700 hover:bg-slate-700/40 transition ${
                    i % 2 === 0 ? "bg-slate-800/40" : ""
                  }`}
                >
                  <td className="px-4 sm:px-6 py-3 font-mono text-indigo-400">
                    {o.id.slice(-6)}
                  </td>
                  <td className="px-4 sm:px-6 py-3">{o.customer}</td>
                  <td className="px-4 sm:px-6 py-3 text-slate-400">
                    {o.product}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right font-semibold">
                    ₹{o.amount}
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  </div>
</div>
  )
}