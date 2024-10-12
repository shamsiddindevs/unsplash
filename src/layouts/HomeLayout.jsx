import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
