import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import banner1 from "../assets/banner/mgcrr9hcmyqcxvhko4ba.webp";
import banner2 from "../assets/banner/5c3dcbfe70.webp";
// import banner3 from "../assets/banner/5c3dcbfe70.webp";
import banner4 from "../assets/banner/wjy3tmsx9hyoqlwpfumc.webp"
const imageURL = import.meta.env.VITE_IMAGE_URL;
export default function Home() {
  const [Products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [current, setCurrent] = useState(0);

  const images = [
    banner1 ,banner4,banner2
  ];

  // HERO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ LOAD PRODUCTS (CLEAN)
  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOAD CATEGORIES (FIXED)
  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

useEffect(() => {
  const delay = setTimeout(() => {
    loadProducts();
  }, 500); // wait 500ms after typing

  return () => clearTimeout(delay);
}, [search, category]);

  return (
    <div className="bg-[#f8f8f8] text-gray-900">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-gray-900">
        {images.map((img, index) => (
          <div key={index}>
           <img
  src={img}
  alt="hero"
  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 ease-out ${
    index === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
  }`}
/>

{/* CLEAN GRADIENT */}
<div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/20 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-white/80 uppercase tracking-[0.4em] text-xs mb-6 block">
              New Collection 2026
            </span>

            <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-10">
              Elevated Casuals for <br />
              <span className="italic font-light text-white/90">
                Everyday Living
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/shop"
                className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="px-10 py-4 border border-white/40 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                Explore Story
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 transition-all duration-500 rounded-full ${
                current === index ? "w-10 bg-white" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={() => setCategory("")}
            className={`px-6 py-2 rounded-full border ${
              category === "" ? "bg-black text-white" : "bg-white"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setCategory(cat._id)}
              className={`px-6 py-2 rounded-full border ${
                category === cat._id ? "bg-black text-white" : "bg-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.section>

      {/* NEW ARRIVALS */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-10"
      >
        <h2 className="text-2xl font-semibold mb-10">New Arrivals</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? Array(4).fill().map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-70 rounded-lg"></div>
                  <div className="h-4 bg-gray-300 mt-3 w-3/4 rounded"></div>
                  <div className="h-4 bg-gray-200 mt-2 w-1/2 rounded"></div>
                </div>
              ))
            : Products.slice(0, 8).map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <div className="transition duration-300 hover:scale-105">
                    <div className="bg-white rounded-lg overflow-hidden">
                      <img
                        src={`${imageURL}${product.images?.[0]}`}
                        alt={product.title}
                        className="w-full h-70 object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="mt-3">
                      <h3 className="text-xl font-semibold line-clamp-1">{product.title}</h3>
                      <p className="flex justify-between items-center mt-6">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
  className="bg-gray-50 py-20 mt-10"
>
  <h2 className="text-center text-3xl font-semibold mb-4">
    Trusted by Backpackers
  </h2>

  <p className="text-center text-gray-500 mb-12">
    Real reviews from our happy customers
  </p>

  <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
    {[
      {
        name: "Rahul Sharma",
        role: "Travel Blogger",
        image: "https://i.pravatar.cc/100?img=1",
        review:
          "This backpack handled my entire Ladakh trip. Durable, spacious, and super comfortable.",
      },
      {
        name: "Ankit Verma",
        role: "Software Engineer",
        image: "https://i.pravatar.cc/100?img=2",
        review:
          "Perfect laptop backpack. Clean design + strong build. Totally worth the price.",
      },
      {
        name: "Neha Kapoor",
        role: "Student",
        image: "https://i.pravatar.cc/100?img=3",
        review:
          "Lightweight and stylish! I carry it daily to college and it still looks brand new.",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -8 }}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
      >
        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.role}</p>
          </div>
        </div>

        {/* STARS */}
        <div className="flex text-yellow-400 mb-3 text-sm">
          ⭐⭐⭐⭐⭐
        </div>

        {/* REVIEW */}
        <p className="text-gray-600 text-sm leading-relaxed">
          "{item.review}"
        </p>
      </motion.div>
    ))}
  </div>
</motion.section>

      {/* NEWSLETTER */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <div className="bg-linear-to-r from-gray-900 to-black text-white rounded-xl p-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Join Our Backpack Community
          </h2>

          <p className="text-gray-400 mb-6">
            Get travel tips, product updates & exclusive offers.
          </p>

 
        </div>
      </motion.section>
    </div>
  );
}