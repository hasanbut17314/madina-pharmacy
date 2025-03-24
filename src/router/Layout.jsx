import React from 'react'
import {Header, Footer} from "../components/basics";
import { Outlet } from "react-router-dom"; 

function Layout() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
