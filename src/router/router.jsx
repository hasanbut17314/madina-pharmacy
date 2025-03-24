import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/general";
import { ManagerDashboard } from "../pages/manager";
import { AdminDashboard } from "../pages/admin";
import { UserProfile } from "../pages/user";
import { RiderDashboard } from "../pages/rider";
import {Layout} from ".";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: 'manager',
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "manager",
        children: [
          { index: true, element: <ManagerDashboard /> },
          // { path: "orders", element: <ManagerOrders /> },add other routes here
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
          // { path: "orders", element: <UserOrders /> },add other routes here
        ],
      },

      {
        path: "rider",
        children: [
          { index: true, element: <RiderDashboard /> },
          // { path: "deliveries", element: <RiderDeliveries /> },add other routes here
        ],
      },
    ],
  },
]);



export default router;