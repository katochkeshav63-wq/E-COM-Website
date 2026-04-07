import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import banner1 from  "../assets/banner/kvbddf0kls0jujteer2j.webp"
const imageURL = import.meta.env.VITE_IMAGE_URL;

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const location = useLocation();

  // ✅ SYNC URL → STATE
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearch(params.get("search") || "");
    setCategory(params.get("category") || "");
    setMinPrice(params.get("minPrice") || "");
    setMaxPrice(params.get("maxPrice") || "");
  }, [location.search]);

  // ✅ LOAD CATEGORIES (ONLY ONCE)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, []);

  // ✅ LOAD PRODUCTS (OPTIMIZED)
  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);

        const res = await api.get(`/products?${params.toString()}`, {
          signal: controller.signal, // ✅ cancel old request
        });

        setProducts(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    // ✅ debounce (reduce calls)
    const delay = setTimeout(() => {
      loadProducts();
    }, 400);

    return () => {
      clearTimeout(delay);
      controller.abort(); // ✅ cancel previous API
    };
  }, [search, category, minPrice, maxPrice]);
const heroImg =banner1;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="relative h-[55vh] md:h-[30vh] w-full overflow-hidden bg-gray-900">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-white/70 uppercase tracking-[0.4em] text-xs mb-4 block">
              Shop our products
            </span>

            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
               Discover the latest products
              <br />
              <span className="italic font-light text-white/90">
                at the best prices.
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-64"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* PRICE */}
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-3 rounded-lg w-32"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-3 rounded-lg w-32"
            />

            <button
              onClick={() => {
                setSearch("");
                setCategory("");
                setMinPrice("");
                setMaxPrice("");
              }}
              className="bg-gray-200 px-5 py-3 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow animate-pulse overflow-hidden">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            : products.map((product, index) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={`${imageURL}${product.images?.[0] || "https://via.placeholder.com/400"}`}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-semibold line-clamp-1">
                        {product.title}
                      </h2>

                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center mt-6">
                        <span className="text-2xl font-bold text-indigo-600">
                          ₹{product.price}
                        </span>

                        <span className="text-sm font-medium text-indigo-600">
                          View →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}