import api from "../api/axios";
export async function getAllStats () {
  const res = await api.get("/stats");
  return res.data;
}