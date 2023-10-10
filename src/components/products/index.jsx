import React, { useEffect, useRef, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const onIntersection = (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems();
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [products]);

  const elementRef = useRef(null);

  async function fetchMoreItems() {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`
    );
    const data = await response.json();
    if (data.products.length == 0) {
      setHasMore(false);
    } else {
      setProducts((prev) => [...prev, ...data.products]);
      setPage((prevPage) => prevPage + 1);
    }
    console.log(products);
  }

  return (
    <div className="flex flex-wrap gap-8 px-2">
      {products.map((item, idx) => {
        return (
          <div
            key={idx}
            className="grid grid-cols-2  max-w-md  mx-auto bg-slate-100 overflow-hidden"
          >
            <div className=" h-[200px] w-full">
              <img
                src={item.thumbnail}
                className="object-cover overflow-hidden"
              />
            </div>
            <div className="flex flex-col p-2">
              <h2 className="text-xl font-bold flex-1"> {item.title}</h2>
              <h3 className="text-lg">{item.price}</h3>
              <p className="text-sm overflow-scroll ">{item.description}</p>
            </div>
          </div>
        );
      })}
      {hasMore && (
        <div
          ref={elementRef}
          className="px-4 py-3 bg-red-300 font-bold text-[700] items-center justify-center"
        >
          Load more items.
        </div>
      )}
    </div>
  );
};

export default Products;
