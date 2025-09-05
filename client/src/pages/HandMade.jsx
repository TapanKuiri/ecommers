import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ProductItem } from '../components/ProductItem';
import { assets } from '../assets/assets'; // make sure spinner exists here
import axios from 'axios';

export const HandMade = () => {
  const { backendUrl } = useContext(ShopContext);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterHandMadeProducts = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/relatedProducts`, { 
        category: 'Hand Made' 
      });

      setMyProducts(response.data.products || []);
      if(response.data.products.length > 0) setLoading(false);
    } catch (error) {
      console.error("Error fetching handmade products:", error.message);
    } 
  };

  useEffect(() => {
    filterHandMadeProducts();
  }, []);

  return (
    <div className="container mx-auto mt-5 px-2 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

        {/* Loading state */}
        {loading ? (
          [1, 2, 3, 4, 5, 6,7,8].map((i) => (
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
          ))
        ) : myProducts.length > 0 ? (
          myProducts.map((product, index) => (
            <ProductItem
              key={index}
              name={product.name}
              id={product._id}
              price={product.price}
              finalPrice={product.finalPrice}
              image={product.image}
              category={product.category}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No handmade products found
          </p>
        )}
      </div>
    </div>
  );
};
