import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';
import { assets } from '../assets/assets';

export const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setLatestProducts(products);
      setIsLoading(false); 
  }, [products]);

  return (
    <div className="my-1 px-1 py-12 rounded-xl shadow-md duration-500" >
      {/* Title Section */}
      <div className="text-center pb-8 text-3xl font-semibold text-gray-800 relative">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center border rounded-lg p-4 h-48 bg-gray-50 shadow-sm"
            >
              {/* SVG Spinner */}
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
          {latestProducts.map((item, index) => (
            <div
              key={index}
              className="transition-transform transform overflow-hidden"
            >
              <ProductItem
                id={item._id}
                image={item.image }
                name={item.name}
                price={item.price}
                discount={item.discount}
                finalPrice={item.finalPrice}
              />
            </div>
          ))}
        </div>
      )}
      </div>

    </div>
  );
};
