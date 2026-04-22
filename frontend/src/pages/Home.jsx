import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/banner/mgcrr9hcmyqcxvhko4ba.webp";
import banner2 from "../assets/banner/5c3dcbfe70.webp";
import banner4 from "../assets/banner/wjy3tmsx9hyoqlwpfumc.webp";
import banner5 from "../assets/banner/4d5814a6ff.webp"

/* ─────────────────────────────────────────────
   Inject global styles (fonts + custom classes)
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    :root {
      --cream: #f5f0e8;
      --charcoal: #1a1a1a;
      --warm-gray: #8c8278;
      --accent: #c8a96e;
      --accent-light: #e8d5b0;
      --white: #ffffff;
    }

    body { font-family: 'DM Sans', sans-serif; }

    .font-display { font-family: 'Cormorant Garamond', serif; }

    .hero-ken-burns {
      animation: kenBurns 8s ease-in-out infinite alternate;
    }
    @keyframes kenBurns {
      from { transform: scale(1); }
      to   { transform: scale(1.07); }
    }

    .marquee-track {
      display: flex;
      gap: 3rem;
      animation: marquee 22s linear infinite;
      white-space: nowrap;
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    .product-card:hover .product-img { transform: scale(1.06); }
    .product-img { transition: transform 0.6s cubic-bezier(.25,.46,.45,.94); }

    .btn-primary {
      position: relative; overflow: hidden;
      background: var(--charcoal); color: var(--white);
      letter-spacing: .15em; font-size: .7rem; font-weight: 600;
      padding: .9rem 2.5rem; transition: color .3s;
    }
    .btn-primary::after {
      content:''; position:absolute; inset:0;
      background: var(--accent);
      transform: translateX(-100%);
      transition: transform .4s cubic-bezier(.77,0,.18,1);
    }
    .btn-primary:hover::after { transform: translateX(0); }
    .btn-primary span { position: relative; z-index: 1; }

    .btn-ghost {
      border: 1px solid rgba(255,255,255,.4);
      color: var(--white);
      letter-spacing: .15em; font-size: .7rem; font-weight: 600;
      padding: .9rem 2.5rem;
      backdrop-filter: blur(4px);
      transition: background .3s, border-color .3s;
    }
    .btn-ghost:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.7); }

    .cat-pill {
      padding: .5rem 1.5rem;
      border-radius: 9999px;
      border: 1px solid #d6d0c8;
      background: var(--white);
      font-size: .75rem; font-weight: 500;
      letter-spacing: .08em; text-transform: uppercase;
      transition: all .25s;
      cursor: pointer;
    }
    .cat-pill.active, .cat-pill:hover {
      background: var(--charcoal); color: var(--white); border-color: var(--charcoal);
    }

    .category-card {
      position: relative; overflow: hidden;
      border-radius: 4px;
      cursor: pointer;
    }
    .category-card img { transition: transform .7s cubic-bezier(.25,.46,.45,.94); }
    .category-card:hover img { transform: scale(1.1); }
    .category-card .overlay {
      position:absolute; inset:0;
      background: linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,.1) 55%, transparent 100%);
    }

    .tag-badge {
      display: inline-block;
      background: var(--accent); color: var(--charcoal);
      font-size: .6rem; font-weight: 700; letter-spacing: .12em;
      text-transform: uppercase; padding: .25rem .6rem;
      border-radius: 2px;
    }

    .testimonial-card {
      background: var(--white);
      border: 1px solid #ede8e0;
      border-radius: 8px;
      transition: box-shadow .3s, transform .3s;
    }
    .testimonial-card:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,.08);
      transform: translateY(-6px);
    }

    .newsletter-input {
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255,255,255,.3);
      color: white; padding: .75rem 0;
      font-family: 'DM Sans', sans-serif;
      font-size: .9rem; width: 100%;
      outline: none; transition: border-color .3s;
    }
    .newsletter-input::placeholder { color: rgba(255,255,255,.4); }
    .newsletter-input:focus { border-color: var(--accent); }

    .shimmer {
      background: linear-gradient(90deg, #e8e4dc 25%, #f0ece4 50%, #e8e4dc 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { to { background-position: -200% 0; } }

    .section-label {
      font-size: .65rem; font-weight: 600; letter-spacing: .25em;
      text-transform: uppercase; color: var(--accent);
      margin-bottom: .75rem; display: block;
    }
  `}</style>
);

/* ─────────────────────────────
   FEATURE STRIP
───────────────────────────── */
const features = [
  { icon: "🎒", label: "Free Shipping over ₹999" },
  { icon: "🔒", label: "Secure Payments" },
  { icon: "♻️", label: "Eco-Friendly Materials" },
  { icon: "↩️", label: "30-Day Easy Returns" },
];

/* ─────────────────────────────
   MAIN COMPONENT
───────────────────────────── */
export default function Home() {
  const [Products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState("");

  const images = [banner1, banner4, banner2];

  // HERO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // LOAD CATEGORIES
  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  useEffect(() => {
    const delay = setTimeout(() => { loadProducts(); }, 500);
    return () => clearTimeout(delay);
  }, [search, category]);

  /* ── Group products by category ── */
  const productsByCategory = categories.map((cat) => ({
    ...cat,
    items: Products.filter((p) =>
      p.category === cat._id || p.category?._id === cat._id
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div style={{ background: "var(--cream)", color: "var(--charcoal)" }}>
      <GlobalStyles />

      {/* ══════════════════════════════
          HERO SECTION
      ══════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "95vh" }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="hero"
              className={`w-full h-full object-cover ${index === current ? "hero-ken-burns" : ""}`}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.2) 60%, transparent 100%)",
              }}
            />
          </div>
        ))}

        {/* HERO TEXT */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label" style={{ color: "var(--accent-light)" }}>
                New Collection 2026
              </span>
              <h1
                className="font-display text-white leading-none mb-8"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 300 }}
              >
                Elevated Casuals
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 300, opacity: 0.85 }}>
                  for Everyday Living
                </em>
              </h1>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn-primary">
                  <span className="uppercase tracking-widest">Shop Now</span>
                </Link>
                <Link to="/about" className="btn-ghost uppercase tracking-widest">
                  Explore Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-10 flex gap-2 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                height: "2px",
                background: i === current ? "white" : "rgba(255,255,255,.3)",
                width: i === current ? "2.5rem" : "1rem",
                transition: "all .5s",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-10 flex items-center gap-3"
          style={{ color: "rgba(255,255,255,.5)", fontSize: ".65rem", letterSpacing: ".2em" }}
        >
          <div
            style={{
              width: "1px", height: "3rem",
              background: "rgba(255,255,255,.3)",
            }}
          />
          <span className="uppercase">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════
          FEATURE STRIP
      ══════════════════════════════ */}
      <div
        className="py-5 border-y"
        style={{ borderColor: "#ddd8ce", background: "var(--white)" }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span style={{ fontSize: "1.4rem" }}>{f.icon}</span>
              <span
                style={{
                  fontSize: ".7rem", fontWeight: 600,
                  letterSpacing: ".08em", textTransform: "uppercase",
                  color: "var(--charcoal)",
                }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════ */}
      <div
        className="overflow-hidden py-4"
        style={{ background: "var(--charcoal)", color: "var(--accent-light)" }}
      >
        <div className="marquee-track">
          {Array(8).fill(["Free Shipping", "New Arrivals 2026", "Handcrafted Backpacks", "Explore the Range", "Premium Quality"]).flat().map((t, i) => (
            <span key={i} style={{ fontSize: ".7rem", fontWeight: 500, letterSpacing: ".2em", textTransform: "uppercase" }}>
              {t} &nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          SEARCH + FILTER
      ══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 pt-16 pb-4"
      >
        {/* Search bar */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="flex-1 flex items-center gap-3 px-5 py-3"
            style={{
              background: "var(--white)",
              border: "1px solid #ddd8ce",
              borderRadius: "2px",
            }}
          >
            <svg width="16" height="16" fill="none" stroke="var(--warm-gray)" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bags, backpacks…"
              style={{
                border: "none", outline: "none", background: "transparent",
                fontFamily: "'DM Sans', sans-serif", fontSize: ".9rem",
                color: "var(--charcoal)", width: "100%",
              }}
            />
          </div>
        </div>

        {/* Category pills */}
        <div>
          <span className="section-label">Shop by Category</span>
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={() => setCategory("")}
              className={`cat-pill ${category === "" ? "active" : ""}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setCategory(cat._id)}
                className={`cat-pill ${category === cat._id ? "active" : ""}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════
          NEW ARRIVALS GRID
      ══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-label">Curated for You</span>
            <h2 className="font-display" style={{ fontSize: "2.4rem", fontWeight: 300, lineHeight: 1.1 }}>
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            style={{
              fontSize: ".7rem", fontWeight: 600, letterSpacing: ".15em",
              textDecoration: "underline", textUnderlineOffset: "4px",
              textTransform: "uppercase", color: "var(--warm-gray)",
            }}
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {loading
            ? Array(8).fill(null).map((_, i) => (
                <div key={i}>
                  <div className="shimmer rounded" style={{ height: "320px" }} />
                  <div className="shimmer mt-3 rounded" style={{ height: "16px", width: "70%" }} />
                  <div className="shimmer mt-2 rounded" style={{ height: "14px", width: "40%" }} />
                </div>
              ))
            : Products.slice(0, 8).map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <Link to={`/product/${product._id}`} className="product-card block">
                    <div
                      className="overflow-hidden"
                      style={{ borderRadius: "4px", background: "#eee8de", position: "relative" }}
                    >
                      <img
                        src={product.images?.[0] || ""}
                        alt={product.title}
                        className="product-img w-full object-cover"
                        style={{ height: "300px" }}
                      />
                      {i < 2 && (
                        <div className="absolute top-3 left-3">
                          <span className="tag-badge">New</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <h3 className="font-medium line-clamp-1" style={{ fontSize: ".95rem" }}>
                        {product.title}
                      </h3>
                      <p
                        className="mt-1 font-semibold"
                        style={{ fontSize: ".9rem", color: "var(--charcoal)" }}
                      >
                        ₹{product.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════
          EDITORIAL BANNER
      ══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-6 md:mx-16 my-8 rounded overflow-hidden"
        style={{ position: "relative", height: "60vh" }}
      >
        <img
          src={banner5}
          alt="editorial"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(.75)" }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ background: "rgba(0,0,0,.25)" }}
        >
          <span className="section-label" style={{ color: "var(--accent-light)" }}>
            Limited Edition
          </span>
          <h2
            className="font-display text-white mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 300 }}
          >
            The Expedition Series
          </h2>
          <Link to="/shop" className="btn-primary">
            <span className="uppercase tracking-widest">Discover Now</span>
          </Link>
        </div>
      </motion.section>

      {/* ══════════════════════════════
          CATEGORY-BASED SECTIONS
      ══════════════════════════════ */}


      {/* FALLBACK: show category blocks even if no products loaded yet */}
      {productsByCategory.length === 0 && !loading && categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-14">
          <span className="section-label">Browse Categories</span>
          <h2 className="font-display mb-10" style={{ fontSize: "2.2rem", fontWeight: 300 }}>
            Shop by Style
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setCategory(cat._id)}
                className="cat-pill py-6 rounded text-center"
                style={{ borderRadius: "4px", fontSize: ".8rem" }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>
      )}
      

      {/* ══════════════════════════════
          TESTIMONIALS
      ══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 mt-4"
        style={{ background: "var(--white)", borderTop: "1px solid #ddd8ce" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label" style={{ display: "block" }}>
              Community
            </span>
            <h2 className="font-display" style={{ fontSize: "2.6rem", fontWeight: 300 }}>
              Trusted by Backpackers
            </h2>
            <p style={{ color: "var(--warm-gray)", fontSize: ".9rem", marginTop: ".5rem" }}>
              Real reviews from our happy customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rahul Sharma",
                role: "Travel Blogger",
                image: "https://i.pravatar.cc/100?img=1",
                review: "This backpack handled my entire Ladakh trip. Durable, spacious, and super comfortable.",
              },
              {
                name: "Ankit Verma",
                role: "Software Engineer",
                image: "https://i.pravatar.cc/100?img=2",
                review: "Perfect laptop backpack. Clean design + strong build. Totally worth the price.",
              },
              {
                name: "Neha Kapoor",
                role: "Student",
                image: "https://i.pravatar.cc/100?img=3",
                review: "Lightweight and stylish! I carry it daily to college and it still looks brand new.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="testimonial-card p-7"
              >
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-full object-cover"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <h3 style={{ fontSize: ".9rem", fontWeight: 600 }}>{item.name}</h3>
                    <p style={{ fontSize: ".75rem", color: "var(--warm-gray)" }}>{item.role}</p>
                  </div>
                </div>

                <div className="flex mb-4" style={{ gap: ".15rem", color: "#c8a96e" }}>
                  {Array(5).fill("★").map((s, j) => (
                    <span key={j} style={{ fontSize: ".9rem" }}>{s}</span>
                  ))}
                </div>

                <p style={{ color: "var(--warm-gray)", fontSize: ".88rem", lineHeight: 1.75 }}>
                  "{item.review}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════
          NEWSLETTER
      ══════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <div
          className="relative overflow-hidden"
          style={{
            background: "var(--charcoal)",
            borderRadius: "8px",
            padding: "4rem 3rem",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute", right: "-5rem", top: "-5rem",
              width: "20rem", height: "20rem",
              borderRadius: "50%",
              border: "1px solid rgba(200,169,110,.15)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", right: "-2rem", top: "-2rem",
              width: "14rem", height: "14rem",
              borderRadius: "50%",
              border: "1px solid rgba(200,169,110,.1)",
              pointerEvents: "none",
            }}
          />

          <div className="relative max-w-xl">
            <span className="section-label" style={{ color: "var(--accent)" }}>
              Stay Connected
            </span>
            <h2
              className="font-display text-white mb-3"
              style={{ fontSize: "2.4rem", fontWeight: 300 }}
            >
              Join Our Backpack Community
            </h2>
            <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".9rem", marginBottom: "2.5rem" }}>
              Get travel tips, product updates & exclusive offers.
            </p>

            <div className="flex gap-4 items-end flex-wrap">
              <div style={{ flex: 1, minWidth: "220px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="newsletter-input"
                />
              </div>
              <button
                className="btn-primary"
                style={{ flexShrink: 0 }}
                onClick={() => { alert("Subscribed!"); setEmail(""); }}
              >
                <span className="uppercase tracking-widest">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}