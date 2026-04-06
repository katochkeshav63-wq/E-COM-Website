import { motion } from "framer-motion";
import { useRef } from "react";
import banner1 from  "../assets/banner/kvbddf0kls0jujteer2j.webp"
import banner2 from  "../assets/banner/wjy3tmsx9hyoqlwpfumc.webp"
import banner3 from  "../assets/banner/5ad215874e.jpg"
export default function About() {
  const containerRef = useRef(null);

  const heroImg =banner1;
     // travel vibe
  const craftImg =banner3 // backpack making
  const detailImg =
    banner2; // material close-up

  return (
    <div className="bg-[#f8f8f8] text-gray-900" ref={containerRef}>

      {/* 🔥 HERO */}
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
              About Our Brand
            </span>

            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              Built for Adventure,
              <br />
              <span className="italic font-light text-white/90">
                Designed for Everyday Life
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 🧠 BRAND STORY */}
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
          comfort, and modern design. Whether you're commuting to work,
          exploring new cities, or heading into the wild — our backpacks are
          made to support your journey every step of the way.
        </p>
      </motion.section>

      {/* 🔥 IMAGE + TEXT */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16 items-center"
      >
        <div className="overflow-hidden rounded-2xl">
          <img
            src={craftImg}
            className="w-full h-105 object-cover hover:scale-105 transition duration-700"
          />
        </div>

        <div>
          <h3 className="text-3xl font-semibold mb-4">
            Engineered for Real Life
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            Every backpack is crafted with purpose — from reinforced stitching
            to water-resistant materials. We design with real users in mind,
            ensuring maximum comfort, smart storage, and long-lasting
            performance.
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
        </div>
      </motion.section>

      {/* 💎 VALUES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Durability",
              desc: "Built with high-quality materials for long-term use.",
            },
            {
              title: "Smart Design",
              desc: "Organized compartments for tech, travel, and daily carry.",
            },
            {
              title: "All-Weather Ready",
              desc: "Water-resistant and rugged for every environment.",
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
      </motion.section>

      {/* 🚀 CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <div className="bg-lineart-to-r from-gray-900 to-black text-white rounded-xl p-10 text-center">
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