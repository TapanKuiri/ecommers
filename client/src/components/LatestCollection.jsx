import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem';

export const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products);
  }, [products]);

  return (
    <div className="my-1 px-5  py-12 rounded-xl shadow-md   duration-500">
      {/* Title Section */}
      <div className="text-center pb-8 text-3xl font-semibold text-gray-800 relative">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-2 rounded-full animate-pulse"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="transition-transform transform   overflow-hidden"
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
    </div>
  );
};
