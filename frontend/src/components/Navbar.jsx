import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { FaBoxOpen } from "react-icons/fa";     // Orders
import { FiLogOut } from "react-icons/fi"; 
  // Logout

export default function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // 🔍 SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    let query = `/shop`;
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if ([...params].length > 0) query += `?${params.toString()}`;
    navigate(query);
    setMenuOpen(false);
  };

  // 🛒 LOAD CART COUNT
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!userId) {
          setCartCount(0);
          return;
        }
        const res = await api.get(`/cart/${userId}`);
        const total = res.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch (err) {
        console.error(err);
      }
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  // 📦 LOAD CATEGORIES
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

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCartCount(0);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* TOP BAR */}
      <div className="bg-black text-white text-center text-xs py-1">
        🚚  Global shipping with reliable delivery partners
      </div>

      {/* NAV */}
      <nav className="flex items-center justify-between px-4 py-2 relative">
        {/* LEFT (Desktop) */}
        <div className="hidden md:flex gap-6 text-sm font-light">
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        {/* LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-xl sm:text-2xl font-bold">
            BAGIFY
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* SEARCH (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center border rounded-full px-3 py-1.5"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="outline-none px-2 w-28 text-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm cursor-pointer"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button type="submit" className="cursor-pointer">🔍</button>
          </form>

          {/* CART */}
          <Link to="/cart" className="relative text-xl sm:text-2xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* AUTH */}
          <div className="hidden sm:flex gap-3 text-sm items-center">
            {!userId ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            ) : (
              <>
                <Link
                  to="/my-orders"
                 className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
                >
             Orders  <FaBoxOpen /> 
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded text-red-600 cursor-pointer"
                >
               <FiLogOut />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 border-t bg-white">
          {/* LINKS */}
          <div className="flex flex-col gap-3 text-sm">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            {userId && (
              <Link
                to="/my-orders"
                onClick={() => setMenuOpen(false)}
                className="border px-3 py-2 rounded text-center hover:bg-black hover:text-white transition"
              >
                My Orders
              </Link>
            )}
          </div>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="border px-3 py-2 rounded"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button className="bg-black text-white py-2 rounded">Search</button>
          </form>

          {/* AUTH */}
          <div className="flex flex-col gap-2 text-sm">
            {!userId ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
              </>
            ) : (
              <button onClick={logout}>Logout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}