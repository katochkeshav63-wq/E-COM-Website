import api from "../api/axios";

export const getRecentOrders = async () => {
  const res = await api.get("order/recent");
  return res.data;
};