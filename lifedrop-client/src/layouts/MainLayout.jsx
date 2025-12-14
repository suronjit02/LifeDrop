import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="min-h-[calc(100vh-275px)] ">
        <Outlet />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
