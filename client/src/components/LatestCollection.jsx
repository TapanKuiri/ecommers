import React, { useState, useEffect, useContext, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';
import { assets } from '../assets/assets';

export const LatestCollection = () => {
  const { products, getProductsData } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null); // 🔹 reference to the amber container

  useEffect(() => {
    getProductsData(page).then(() => setIsLoading(false));
  }, [page]);

  // Infinite scroll inside container
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
      {/* 🔹 Added fixed height + overflow-y-auto so it’s scrollable */}
      <div className="text-center pb-8 text-3xl font-semibold text-gray-800 relative">
        <Title text1={'LATEST'} text2={'COLLECTION'} />

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
            {products.map((item, index) => (
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
            ))}
          </div>
        )}

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
