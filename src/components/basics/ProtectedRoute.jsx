import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userRole = user?.role || null;

  const generalPublicRoutes = ["/", "/cart", "/shop", "/about", "/contact", "/product", "/checkout"];

  const isPublicRoute = generalPublicRoutes.some((route) => location.pathname.startsWith(route));

  // ✨ If user is logged in and trying to access login page
  if (userRole && location.pathname === "/login") {
    return <Navigate to={`/${userRole}`} replace />;
  }

  // ✨ Handle if no user logged in
  if (!userRole) {
    if (isPublicRoute || location.pathname === "/login") {
      return <Outlet />; // Allow public pages + login
    } else {
      return <Navigate to="/login" replace />; // Block private pages
    }
  }

  // ✨ Handle if logged in but role mismatch
  if (allowedRoles.includes(userRole)) {
    return <Outlet />; // Correct role
  } else {
    return <Navigate to={`/${userRole}`} replace />; // Redirect to correct dashboard
  }
};

export default ProtectedRoute;
