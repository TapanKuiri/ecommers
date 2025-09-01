import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "./Title";
import { ProductItem } from "./ProductItem";
import { assets } from "../assets/assets";

export const LatestCollection = () => {
  const { products, getProductsData, search, showSearch } =
    useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const allImages = [assets.coll1, assets.coll2, assets.coll3, assets.coll4];

  // 🔹 Banner auto-rotation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // 🔹 Fetch products (infinite scroll)
  useEffect(() => {
    getProductsData(page).then(() => setIsLoading(false));
  }, [page]);

  // 🔹 Apply filter logic
  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category?.toLowerCase())
      );
    }

    setFilterProducts(productCopy);
  };

  // 🔹 Run filters when dependencies change
  useEffect(() => {
    applyFilter();
  }, [search, showSearch, products, category]);

  // 🔹 Infinite scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight + 100 >=
        container.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-1 px-1 py-12 rounded-xl shadow-md duration-500 h-[80vh] overflow-y-auto"
    >
      {/* 🔹 Show rotating banner only when no search */}
      {(!showSearch || !search) && (
        <div className="h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl transition-all duration-700 relative">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={allImages[currentIndex]}
            alt="banner"
          />
        </div>
      )}

      <div className="text-center mt-5 pb-8 text-3xl font-semibold text-gray-800 relative">
        <Title text1="LATEST" text2="COLLECTION" />

        {/* 🔹 Loading state */}
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center border rounded-lg p-4 h-48 bg-gray-50 shadow-sm"
              >
                <img
                  src={assets.spinner}
                  alt="Loading..."
                  className="w-10 h-10 animate-spin"
                />
                <p className="text-xs text-gray-400 mt-2">Loading...</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-7">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform transform overflow-hidden"
                >
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    discount={item.discount}
                    finalPrice={item.finalPrice}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-gray-500 text-lg mt-10">
                No products found 😞
              </p>
            )}
          </div>
        )}

        {/* 🔹 Infinite scroll loader */}
        {isLoading && products.length > 0 && (
          <div className="flex justify-center my-6">
            <img
              src={assets.spinner}
              alt="Loading more..."
              className="w-8 h-8 animate-spin"
            />
          </div>
        )}
      </div>
    </div>
  );
};
