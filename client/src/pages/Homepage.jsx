import React from "react";
import { Outlet } from "react-router-dom";
import { assets } from "../assets/assets";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src={assets.bgGradient}
        alt="background"
        className="absolute -top-70 opacity-50 -z-1"
      />

      <header>
        <Header />
      </header>

      <main className="min-h-[calc(100vh-70px)] mx-4">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Homepage;
