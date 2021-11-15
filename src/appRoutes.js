import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Header-Footer/Footer";
import Header from "./Components/Header-Footer/Header";
import Home from "./Components/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route to="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
