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
  {
    path: "/",
    element: <Layout />, // ✅ protected here
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/orders", element: <AdminOrders /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/update/:id", element: <EditProduct /> },
      { path: "/admin/categories", element: <CategoryPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}