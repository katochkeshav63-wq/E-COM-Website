import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router";

import banner1 from "../assets/banner/kvbddf0kls0jujteer2j.webp";
import banner2 from "../assets/banner/wjy3tmsx9hyoqlwpfumc.webp";

import banner3 from "../assets/banner/4d5814a6ff.webp"
export default function About() {
  const containerRef = useRef(null);

  const heroImg = banner1;
  const craftImg = banner3;
  const detailImg = banner2;

  return (
    <div className="bg-[#f8f8f8] text-gray-900" ref={containerRef}>

      {/* 🔥 HERO */}
      <section className="relative h-[55vh] md:h-[30vh] w-full overflow-hidden bg-gray-900">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-white/70 uppercase tracking-[0.4em] text-xs mb-4 block">
              About Our Brand
            </span>

            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
              Built for Adventure
              <br />
              <span className="italic font-light text-white/90">
                Designed for Everyday Life
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 🧠 STORY */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 py-24 text-center"
      >
        <h2 className="text-4xl font-semibold mb-6">
          Designed for Movement. Built to Last.
        </h2>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          We create high-performance backpacks that combine durability,
          comfort, and modern design. Whether you're commuting, traveling,
          or exploring — our products move with you.
        </p>
      </motion.section>

      {/* 📦 CATEGORY STYLE (LIKE HOMEPAGE) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-10">
          Explore Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Travel Backpacks", img: banner1 },
            { name: "Laptop Bags", img: banner2 },
            { name: "Daily Essentials", img: banner3 },
          ].map((cat, i) => (
            <Link key={i} to="/shop">
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src={cat.img}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />

                <h3 className="absolute bottom-6 left-6 text-white text-xl font-semibold">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 IMAGE + TEXT SPLIT */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="overflow-hidden rounded-2xl"
        >
          <img
            src={craftImg}
            className="w-full h-[500px] object-cover hover:scale-105 transition duration-700"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-3xl font-semibold mb-4">
            Engineered for Real Life
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            Every backpack is crafted with purpose — from reinforced stitching
            to water-resistant materials. Built for everyday challenges.
          </p>

          <div className="flex items-center gap-6 mt-6">
            <img
              src={detailImg}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="text-sm text-gray-500">
              Premium zippers • Waterproof fabric • Ergonomic design
            </span>
          </div>
        </motion.div>
      </section>

      {/* 📊 STATS (NEW PREMIUM SECTION) */}
      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "50+", label: "Cities Covered" },
            { value: "4.9★", label: "Average Rating" },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold mb-2">{item.value}</h3>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💎 VALUES */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Durability",
              desc: "Built with high-quality materials for long-term use.",
            },
            {
              title: "Smart Design",
              desc: "Organized compartments for modern needs.",
            },
            {
              title: "All-Weather Ready",
              desc: "Water-resistant for every journey.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-100 p-8 rounded-xl">
              <h4 className="text-lg font-semibold mb-3">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Start Your Journey Today
          </h2>

          <p className="text-gray-400 mb-8">
            Explore premium backpacks designed for your lifestyle.
          </p>

          <Link
            to="/shop"
            className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
}