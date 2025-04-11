import React from 'react';
import { Header, Footer, ScrollToTop } from "../components/basics";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // List of route prefixes where the Footer should not be shown
  const hideFooterRoutes = ["/admin"];

  // Check if the current path starts with any of the hideFooterRoutes
  const shouldHideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default Layout;
