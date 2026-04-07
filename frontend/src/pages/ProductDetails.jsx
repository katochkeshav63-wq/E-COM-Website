import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
const navigate = useNavigate()
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD SINGLE PRODUCT (FAST)
  const loadProduct = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/products/${id}`);
      setProduct(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  // ✅ IMAGE AUTO SLIDER
  useEffect(() => {
    if (!product || !autoPlay) return;

    const interval = setInterval(() => {
      setActiveImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product, autoPlay]);

  // ✅ ADD TO CART
const addToCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId) {
    toast.error("Please login first ❌");
    navigate("/signup")
    return;
  }

  try {
    const promise = api.post("/cart/add", {
      userId,
      productId: product._id,
    });

    const res = await toast.promise(promise, {
      pending: "Adding to cart...",
      success: "Added to cart 🛒",
      error: "Failed to add to cart ❌",
    });

    const total = res.data.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);
    window.dispatchEvent(new Event("cartUpdated"));

  } catch (err) {
    console.error(err);
  }
};

  // ✅ LOADING SKELETON
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-14 px-6 animate-pulse">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:flex gap-14">
          
          <div className="md:w-1/2">
            <div className="bg-gray-300 h-70 rounded-2xl"></div>

            <div className="flex gap-4 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 w-20 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 space-y-5">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-5/6"></div>

            <div className="h-8 bg-gray-300 rounded w-1/3 mt-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>

            <div className="h-12 bg-gray-300 rounded w-full mt-6"></div>
          </div>

        </div>
      </div>
    );
  }

  // ❌ SAFETY CHECK
  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-14 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:flex gap-14">

        {/* 🖼️ IMAGE SECTION */}
        <div className="md:w-1/2">
          
          <div className="bg-gray-50 rounded-2xl p-8 flex justify-center items-center">
            <img
              src={product.images[activeImage]}
              className="h-60 object-contain transition duration-300 hover:scale-105"
              alt={product.title}
            />
          </div>

          <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setActiveImage(index)}
                className={`h-20 w-20 object-cover rounded-xl cursor-pointer border-2 transition ${
                  activeImage === index
                    ? "border-blue-600 scale-105"
                    : "border-transparent"
                }`}
                alt="thumb"
              />
            ))}
          </div>
        </div>

        {/* 📄 DETAILS */}
        <div className="md:w-1/2 flex flex-col justify-between mt-8 md:mt-0">
          
          <div>
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              {product.title}
            </h1>

            <p className="text-gray-600 mt-5 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center mt-4 text-yellow-500 text-xl">
              ★★★★☆
              <span className="text-gray-600 text-sm ml-3">
                (120 reviews)
              </span>
            </div>

            <p className="text-5xl font-bold text-blue-600 mt-6">
              ₹{product.price}
            </p>

            <p className="text-green-600 mt-3 font-medium text-lg">
              ✔ In Stock
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Free delivery in 3-5 days
            </p>
          </div>

          <div className="mt-10 flex gap-5">
            <button
              onClick={addToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}