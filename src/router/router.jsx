import { createBrowserRouter } from "react-router-dom";
import {
  Cart,
  Home,
  Shop,
  Product,
  Login,
  About,
  Contact,
  Checkout,
  Orders,
  Emailverification,
  Career
} from "../pages/general";
import { Manager, ManagerOrder } from "../pages/manager";
import {
  AdminDashboard,
  Products,
  Category,
  AdminOrders,
  AdminJobs,
  AdminApp
} from "../pages/admin";
import { UserProfile } from "../pages/user";
import { Rider, RiderOrders } from "../pages/rider";
import { Layout } from ".";
import ProtectedRoute from "../components/basics/ProtectedRoute"; // 👉 import here

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:proId", element: <Product /> },
      { path: "verify-email/:token", element: <Emailverification /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "checkout", element: <Checkout /> },
      { path: "orders", element: <Orders /> },
      { path: "career", element: <Career /> },
      // 🔒 Manager Protected Routes
      {
        path: "manager",
        element: <ProtectedRoute allowedRoles={["manager"]} />,
        children: [
          { index: true, element: <Manager /> },
          { path: "order/:orderId", element: <ManagerOrder /> },
        ],
      },

      // 🔒 Admin Protected Routes
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "products", element: <Products /> },
          { path: "category", element: <Category /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "jobs", element: <AdminJobs /> },
          { path: "application", element: <AdminApp /> },
        ],
      },

      // 🔒 User Protected Routes
      {
        path: "user",
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [{ index: true, element: <UserProfile /> }],
      },

      // 🔒 Rider Protected Routes
      {
        path: "rider",
        element: <ProtectedRoute allowedRoles={["rider"]} />,
        children: [
          { index: true, element: <Rider /> },
          { path: "order/:orderId", element: <RiderOrders /> },
        ],
      },
    ],
  },
]);

export default router;
