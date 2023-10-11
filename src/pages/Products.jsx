import React, { useState } from "react";

const Products = () => {
  const [content, setContent] = useState(<ProductList showForm={showForm} />);

  function showList() {
    setContent(<ProductList showForm={showForm} />);
  }
  function showForm() {
    setContent(<ProductForm showList={showList} />);
  }
  return (
    <div className="max-w-4xl w-full mx-auto px-10 text-2xl font-Nunito">
      {content}
    </div>
  );
};

export default Products;

const ProductList = (props) => {
  return (
    <div className="">
      <h2 className=" ">List of name</h2>
      <button
        onClick={() => props.showForm()}
        className="px-4 py-2 bg-red-100 font-semibold rounded-lg"
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
