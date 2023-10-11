import { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Products from "./pages/Products";
import Footer from "./components/navbar/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 flex flex-col min-h-screen ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
