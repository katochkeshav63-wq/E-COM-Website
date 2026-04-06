import { useState, useEffect } from "react"; // ✅ FIXED
import api from "../api/axios";
import { useNavigate ,useParams} from "react-router";
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      const product = res.data;

      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category?._id || product.category || "",
        stock: product.stock || "",
        images: product.images || [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files)); // ✅ fixed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "images") {
          data.append(key, form[key]);
        }
      });

      if (newImages.length > 0) {
        newImages.forEach((img) => {
          data.append("images", img);
        });
      }

      await api.put(`/products/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Existing Images</label>
          <div className="flex gap-2 flex-wrap">
            {form.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="product"
                className="h-16 w-16 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload New Images</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}