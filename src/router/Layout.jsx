import React from 'react';
import { Header, Footer, ScrollToTop } from "../components/basics";
import { Outlet, useLocation } from "react-router-dom";
import Chatbot from '../components/basics/Chatbot'

function Layout() {
  const location = useLocation();

  // Routes where we don't want nav links in the header
  const hideNavLinkRoutes = ["/admin", "/manager", "/rider"];

  const showNavLinks = !hideNavLinkRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const hideFooterRoutes = ["/admin"];
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ScrollToTop />
      <Header showNavLinks={showNavLinks} />
      <Outlet />
      <Chatbot />
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default Layout;
