import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [content, setContent] = useState(<ProductList showForm={showForm} />);

  function showList() {
    setContent(<ProductList showForm={showForm} />);
  }
  function showForm(product) {
    setContent(<ProductForm product={product} showList={showList} />);
  }
  return (
    <div className="max-w-4xl w-full mx-auto px-1 md:px-8 text-2xl font-Nunito">
      {content}
    </div>
  );
};

export default Products;

const ProductList = (props) => {
  const [products, setProducts] = useState([]);

  function handlerDelete(id) {
    fetch(`http://localhost:3004/products/${id}`, {
      method: "DELETE",
    })
      .then((reponse) => {
        toast.success("Delete product -" + id);
        fetchProducts();
      })
      .catch((err) => console.log("Fail internal error"));
  }

  function fetchProducts() {
    fetch("http://localhost:3004/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("fetch data error");
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log("Error", error));
  }
  //fetchProducts();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="gap-2 mt-3 p-3 rounded-xl w-full  text-Blue-950  bg-indigo-100">
      <div className="justify-center items-center flex">
        <span className="mt-2 text-blue-900 bg-slate-50 text-center rounded-lg px-4 py-3 ">
          List of name
        </span>
      </div>
      <div className="flex mt-6 justify-between">
        <button
          onClick={() => props.showForm({})}
          className="px-4 py-2  bg-red-100 text-blue-950 font-semibold rounded-lg"
        >
          Add new item
        </button>
        <button
          onClick={() => fetchProducts()}
          className="px-4 py-2  bg-blue-600 text-blue-100 font-semibold rounded-lg"
        >
          Refresh
        </button>
      </div>
      {products.reverse().map((item, idx) => {
        return (
          <div
            key={idx}
            className="w-full flex justify-between items-center mt-2 bg-blue-50 rounded-sm shadow-sm"
          >
            <div className="px-3 py-2 text-lg font-semibold text-green-600">
              {item.name.substring(0, 10)}
            </div>
            <div className="px-3 py-2 text-lg">{item.identity}</div>
            <div className="space-x-1 mr-1">
              <button
                onClick={() => props.showForm(item)}
                className="p-2  cursor-pointer bg-green-600 text-white text-sm rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => handlerDelete(item.id)}
                className="p-2  cursor-pointer bg-red-600 text-white text-sm rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ProductForm = (props) => {
  const [inputs, setInputs] = useState({ name: "", identity: "" });
  const { name, identity } = inputs;
  if (props.product.id) {
    //toast.error(inputs.name + " " + inputs.identity + " " + props.product.id);
  }
  useEffect(() => {
    if (props.product.id) {
      setInputs(props.product);
    }
  }, []);
  //console.log(props.product);
  function handleInputChange(e) {
    const { name, value } = e.target;
    //console.log(name + "-" + value);

    setInputs({ ...inputs, [name]: value });
    //console.log(inputs);
  }

  function submitform(e) {
    e.preventDefault();
    const create__at = new Date().toISOString().slice(0, 10);

    const form__data = new FormData();
    const product__inputs = Object.fromEntries(form__data.entries());
    //console.log(product__inputs);

    if (!inputs.name || !inputs.identity) {
      console.log("error , please fill data");
      toast.error("🦄 Please fill the form!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (props.product.id) {
      toast.warn("you try to update id-" + props.product.id);
      fetch(`http://localhost:3004/products/${props.product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then()
        .then((data) => props.showList())
        .catch((error) => console.log("Fail to update"));

      return;
    } else {
      fetch("http://localhost:3004/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })
        .then((response) => {
          if (!response.ok) {
            toast.error("🦄 Network error!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            throw new Error("Network Error");
          }
          toast.success("Add " + inputs.name + " to your db.json");
          setInputs({ name: "", identity: "" });
          return response.json();
        })
        .then((data) => props.showList())
        .catch((error) => console.log("error intanal"));
    }
  }
  return (
    <div className="gap-2 mt-3 p-3 rounded-xl w-full  text-Blue-950  bg-indigo-100">
      {/** toastify */}
      <div>
        <ToastContainer />
      </div>
      {/** toastify */}

      <div className="justify-center items-center flex">
        <span className="mt-2 text-green-50 bg-green-600 text-center rounded-lg px-4 py-3 ">
          {props.product.id ? "Edit product " : "Add new product"}
        </span>
      </div>
      <div className="flex mt-6 justify-between">
        <button
          onClick={() => props.showList()}
          className="px-4 py-2  bg-red-100 text-blue-950 font-semibold rounded-lg"
        >
          List of products
        </button>
        <button className="px-4 py-2  bg-blue-600 text-blue-100 font-semibold rounded-lg">
          ...
        </button>
      </div>
      <div className="flex flex-col w-full mt-3">
        <form onSubmit={(e) => submitform(e)}>
          {props.product.id && (
            <div className="">
              <input
                type="text"
                name="id"
                readOnly
                value={props.product.id}
                className="w-full p-3 border-none rounded-t-lg text-red-700 underline"
                placeholder="input name"
              />
            </div>
          )}
          {/**  end hidden product id } */}
          <div className="">
            <input
              type="text"
              name="name"
              defaultValue={props.product.name}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-3 border-none rounded-lg"
              placeholder="input name"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="identity"
              defaultValue={props.product.identity}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-3 border-none rounded-lg"
              placeholder="Identify people"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="rounded-xl shadow-md w-full p-3 bg-blue-700 text-white"
            >
              {props.product.id ? "Update " : "Add new product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
