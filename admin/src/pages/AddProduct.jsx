import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCat, setLoadingCat] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ LOAD CATEGORIES
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories ❌");
      } finally {
        setLoadingCat(false);
      }
    };

    loadCategories();
  }, []);

  // TEXT INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // FILE INPUT
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...images];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setImages(updated);
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setImages(updated);
  };

  // ✅ SUBMIT WITH TOAST
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 BASIC VALIDATION
    if (!form.title || !form.price || !form.category) {
      toast.error("Please fill required fields ❌");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      const promise = api.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await toast.promise(promise, {
        pending: "Adding product...",
        success: "Product added successfully 🎉",
        error: "Failed to add product ❌",
      });

      // ✅ RESET FORM
      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
      setImages([]);

      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
    <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Product Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Price (₹)</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">
                {loadingCat ? "Loading..." : "Select Category"}
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Stock Quantity</label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Enter stock"
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={4}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Upload Images
          </label>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="text-sm"
          />
        </div>

        {/* Image Preview */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((img, index) => (
            <div key={index} className="relative group">

              <img
                src={URL.createObjectURL(img)}
                alt=""
                className={`w-full h-20 sm:h-24 object-cover rounded-lg ${
                  index === 0
                    ? "border-2 border-green-500"
                    : "border"
                }`}
              />

              {/* ACTION BUTTONS */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-white text-xs rounded-lg transition">
                <button type="button" onClick={() => moveUp(index)}>⬆</button>
                <button type="button" onClick={() => moveDown(index)}>⬇</button>
                <button type="button" onClick={() => removeImage(index)}>✖</button>
              </div>

              {index === 0 && (
                <span className="absolute top-1 left-1 bg-green-500 text-white text-[10px] px-1 rounded">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  </div>
);
}