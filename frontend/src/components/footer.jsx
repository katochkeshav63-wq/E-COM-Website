import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">

      {/* 🔝 TOP */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🔹 BRAND */}
        <div>
          <h2 className="text-3xl font-bold tracking-widest mb-4">
            BAGIFY
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium lifestyle products crafted for everyday use. 
            Designed for comfort, built for durability.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
            <FaFacebookF className="cursor-pointer hover:text-gray-300 transition" />
            <FaInstagram className="cursor-pointer hover:text-gray-300 transition" />
            <FaTwitter className="cursor-pointer hover:text-gray-300 transition" />
          </div>
        </div>

        {/* 🔹 LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* 🔹 SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition">FAQ</Link></li>
            <li><Link to="/" className="hover:text-white transition">Shipping</Link></li>
            <li><Link to="/" className="hover:text-white transition">Returns</Link></li>
            <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 🔹 NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get offers, updates & travel inspiration.
          </p>

          <div className="flex border border-gray-700 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-transparent text-sm outline-none"
            />
            <button className="bg-white text-black px-4 text-sm font-semibold hover:bg-gray-200 transition">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* 🔻 BOTTOM */}
      <div className="border-t border-gray-800 py-5 px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

        <p>© {new Date().getFullYear()} Katoch Store. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0">
          <Link to="/" className="hover:text-white transition">Terms</Link>
          <Link to="/" className="hover:text-white transition">Privacy</Link>
        </div>

      </div>
    </footer>
  );
}