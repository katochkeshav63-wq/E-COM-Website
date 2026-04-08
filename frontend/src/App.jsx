import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import Cart from "./pages/cart";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from "./pages/about";
import Contact from "./pages/contact";
import ShopPage from "./pages/shop";
import MyOrders from "./pages/MyOrders"
import TrackOrderTimeline from "./pages/trackOrder";
import ScrollToTop from "./components/scrollup";

function Layout() {
  return (
    <>
    <ScrollToTop />
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/contact", element: <Contact /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/OrderSuccess/:id", element: <OrderSuccess />},
      {path: "/my-orders", element: <MyOrders />},
        {path: "/track/:id", element: <TrackOrderTimeline/>}
    ],
  },
]);

export default function App() {
  return  <RouterProvider router={router} />;
}
