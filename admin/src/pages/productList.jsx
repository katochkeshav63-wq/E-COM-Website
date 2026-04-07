import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

const imageURL = import.meta.env.VITE_IMAGE_URL;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  // console.log(imageURL);
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", err);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

 return (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
    
    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl sm:text-2xl font-bold">Product List</h2>
    </div>

    {/* DESKTOP TABLE */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t text-sm">
              
              <td className="px-4 py-2">
                <img
                  src={`${imageURL}${product?.images?.[0]}` || ""}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>

              <td className="px-4 py-2">{product.title}</td>

              <td className="px-4 py-2">₹{product.price}</td>

              <td className="px-4 py-2">{product.stock}</td>

              <td className="px-4 py-2 space-x-3">
                <Link
                  to={`/admin/products/update/${product._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* MOBILE VIEW (CARD) */}
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg p-4 shadow-sm"
        >
          <div className="flex gap-4">
            <img
              src={product?.images?.[0] || ""}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-sm">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500">
                ₹{product.price}
              </p>

              <p className="text-sm">
                Stock: {product.stock}
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 mt-3 text-sm">
            <Link
              to={`/admin/products/update/${product._id}`}
              className="text-blue-500"
            >
              Edit
            </Link>

            <button
              onClick={() => deleteProduct(product._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
