import React from 'react'
import {Header, Footer} from "../components/basics";
import { Outlet } from "react-router-dom"; 
import {ScrollToTop} from '../components/basics';

function Layout() {
  return (
    <>
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
