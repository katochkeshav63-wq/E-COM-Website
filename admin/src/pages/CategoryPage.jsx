import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CategoryPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load categories
  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await api.post("/categories", { name });
      setName("");
      loadCategories(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete category
  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Manage Categories
      </h2>

      {/* ADD CATEGORY */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name (e.g. Mobiles)"
          className="flex-1 border p-3 rounded-lg"
        />

        <button className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700">
          Add
        </button>
      </form>

      {/* CATEGORY LIST */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500">
          No categories found
        </p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
            >
              <span className="font-medium">{cat.name}</span>

              <button
                onClick={() => handleDelete(cat._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}