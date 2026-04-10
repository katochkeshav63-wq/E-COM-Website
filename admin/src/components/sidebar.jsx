import { Link } from "react-router";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔥 Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Admin</h2>
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* 🔥 Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-50 bg-gray-900 text-white p-5 border-r border-gray-800 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-300 z-50`}
      >
        <h2 className="text-2xl font-bold mb-8 hidden md:block">
          Admin Panel
        </h2>

        <ul className="space-y-4">
          <li>
            <Link to="/admin/dashboard" className="block hover:text-gray-300">
              Dashboard
            </Link>
          </li>
             <li>
            <Link to="/admin/products/add" className="block hover:text-gray-300">
             Add Product
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="block hover:text-gray-300">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="block hover:text-gray-300">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/categories" className="block hover:text-gray-300">
              Category
            </Link>
          </li>
        </ul>
      </div>

      {/* 🔥 Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}