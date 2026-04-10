import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Dashboard from "./pages/dashboard";
import EditProduct from "./pages/editProduct";
import ProductList from "./pages/productList";
import AddProduct from "./pages/AddProduct";
import Sidebar from "./components/sidebar";
import { DataProvider } from "./contexts/DataContext";
import AdminOrders from "./pages/order";
import CategoryPage from "./pages/CategoryPage";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/login";

function Layout() {
  return (
    <AdminRoute>
      <DataProvider>
        <Sidebar />
        <Outlet />
      </DataProvider>
    </AdminRoute>
  );
}

const router = createBrowserRouter([
  // ✅ Public Route (NO AdminRoute here)
  {
    path: "/",
    element: <Login />,
  },

  // ✅ Protected Routes
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <ProductList /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/update/:id", element: <EditProduct /> },
      { path: "categories", element: <CategoryPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}