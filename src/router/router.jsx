import { createBrowserRouter } from "react-router-dom";
import { Cart, Home, Shop, Product, Login, About, Contact } from "../pages/general";
import { Manager, ManagerOrder } from "../pages/manager";
import { AdminDashboard } from "../pages/admin";
import { UserProfile } from "../pages/user";
import { Rider, RiderOrders } from "../pages/rider";
import {Layout} from ".";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:proId", element: <Product /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      {
        path: "manager",
        children: [
          { index: true, element: <Manager /> },
          { path: "order/:orderId", element: <ManagerOrder /> },
        ],
      },

      {
        path: "admin",
        children: [
          { index: true, element: <AdminDashboard /> },
          // { path: "users", element: <AdminUsers /> }, add other routes here
        ],
      },

      {
        path: "user",
        children: [
          { index: true, element: <UserProfile /> },
        ],
      },

      {
        path: "rider",
        children: [
          { index: true, element: <Rider /> },
          { path: "order/:orderId", element: <RiderOrders /> }
        ],
      },
    ],
  },
]);



export default router;