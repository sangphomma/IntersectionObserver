import { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Products from "./components/products";

function App() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <Products />
    </div>
  );
}

export default App;
