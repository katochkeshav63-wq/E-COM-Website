import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Dashboard from "./pages/dashboard";
import EditProduct from "./pages/editProduct";
import ProductList from "./pages/productList";
import AddProduct from "./pages/AddProduct";
import Sidebar from "./components/sidebar";
import { DataProvider } from "./contexts/DataContext";
import AdminOrders from "./pages/order";
import CategoryPage from "./pages/CategoryPage";


function Layout() {
  return (
    <DataProvider>
      <Sidebar />
      <Outlet />
    </DataProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      
        <DataProvider>
          <Sidebar />
          <Outlet />
        </DataProvider>
     
    ),
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