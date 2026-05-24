import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavbarComponents/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
