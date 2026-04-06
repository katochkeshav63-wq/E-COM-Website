import { motion } from "framer-motion";
import banner1 from  "../assets/banner/kvbddf0kls0jujteer2j.webp"
export default function Contact() {
  const heroImg = banner1;

  return (
    <div className="bg-[#f8f8f8] text-gray-900">
      {/* 🔥 HERO (SMALL LIKE ABOUT) */}
      <section className="relative h-[55vh] md:h-[30vh] overflow-hidden">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-white/70 uppercase tracking-[0.4em] text-xs mb-4 block">
              Contact
            </span>

            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
              Let’s Start a Conversation
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 📩 CONTACT FORM */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Get in Touch
        </h2>

        <form className="space-y-8">
          {/* NAME */}
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full mt-2 border-b border-gray-300 bg-transparent py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 border-b border-gray-300 bg-transparent py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full mt-2 border-b border-gray-300 bg-transparent py-3 outline-none focus:border-black transition resize-none"
            />
          </div>

          {/* BUTTON */}
          <div className="text-center pt-6">
            <button className="px-10 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:opacity-80 transition">
              Send Message
            </button>
          </div>
        </form>
      </motion.section>

      {/* 📍 CONTACT INFO */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-white py-16"
      >
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Email",
              value: "support@atelier.com",
            },
            {
              title: "Phone",
              value: "+91 98765 43210",
            },
            {
              title: "Location",
              value: "New Delhi, India",
            },
          ].map((item, i) => (
            <div key={i}>
              <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                {item.title}
              </h4>
              <p className="text-lg font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
