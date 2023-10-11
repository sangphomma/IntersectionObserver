import React, { useEffect, useState } from "react";

const Products = () => {
  const [content, setContent] = useState(<ProductList showForm={showForm} />);

  function showList() {
    setContent(<ProductList showForm={showForm} />);
  }
  function showForm() {
    setContent(<ProductForm showList={showList} />);
  }
  return (
    <div className="max-w-4xl w-full mx-auto px-1 md:px-10 text-2xl font-Nunito">
      {content}
    </div>
  );
};

export default Products;

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  //   async function fetchProducts() {
  //     const response = await fetch("http://localhost:3004/products");
  //     const products = await response.json();
  //     // console.log(products);
  //     if (!response.ok) {
  //       throw new Error("Fetch data error");
  //     }
  //   }

  function fetchProducts() {
    fetch("http://localhost:3004/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("fetch data error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log("Error", error));
  }
  //fetchProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="gap-2 mt-6 p-3 rounded-xl w-full  text-Blue-950  bg-indigo-100">
      <h2 className=" text-blue-900">List of name</h2>
      {products.map((item, idx) => {
        return (
          <div
            key={idx}
            className="w-full flex justify-between items-center mt-2 bg-blue-50 rounded-sm shadow-sm"
          >
            <div className="px-3 py-2 text-lg">{item.name}</div>
            <div className="px-3 py-2 text-lg">{item.identity}</div>
          </div>
        );
      })}
      <button
        onClick={() => props.showForm()}
        className="px-4 py-2 mt-10 bg-red-100 text-blue-950 font-semibold rounded-lg"
      >
        Add new item
      </button>
    </div>
  );
};

const ProductForm = (props) => {
  return (
    <div className="">
      <h2 className="">Add new</h2>
      <button
        onClick={() => props.showList()}
        className="px-4 py-2 bg-red-100 font-semibold rounded-lg"
      >
        Show List
      </button>
    </div>
  );
};
