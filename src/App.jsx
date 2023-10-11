import { useState } from "react";

import Navbar from "./components/navbar/Navbar";
import Products from "./components/products";

function App() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <h2 className="text-xl">Todo list</h2>
    </div>
  );
}

export default App;
