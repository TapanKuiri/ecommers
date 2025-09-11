import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';
import axios from 'axios';
import { Loading } from '../components/loading/Loading';

export default function Products() {
  const { products, search, backendUrl, page, setPage, isLoading, setIsLoading } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent');
  // const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // console.log("products run:");

  // Toggle category filter
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Apply filters
  const applyFilter = async () => {
    setIsLoading(true);
    let productCopy = [...products];

    // Category filter - backend fetch
    if (category.length > 0) {
      try {
        const { data } = await axios.post(`${backendUrl}/api/product/relatedProducts`, {
          category,
        });
        if (data?.success) {
          productCopy = data.products;
        }
      } catch (err) {
        console.error('Error fetching category filtered products:', err.message);
      }
    }

    // Sorting
    switch (sortType) {
      case 'low-high':
        productCopy.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case 'high-low':
        productCopy.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      default:
        break;
    }

    setFilterProducts(productCopy);
    setIsLoading(false);
  };

  // Initialize products
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // Re-apply filters
  useEffect(() => {
    applyFilter();
  }, [category, search, sortType]);

  //  Infinite Scroll (inside container)
  const handelInfiniteScroll = () => {
    if(category.length > 0 ) return;
    
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, clientHeight, scrollHeight } = container;

    // console.log("ScrollTop:", scrollTop, "ClientHeight:", clientHeight, "ScrollHeight:", scrollHeight);

    // Check if reached bottom
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      console.log("Reached bottom ");
      setPage((prev) => prev + 1); // load next page
    }
  };

  useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      container.addEventListener("scroll", handelInfiniteScroll);
      return () => container.removeEventListener("scroll", handelInfiniteScroll);

  }, [category]);

  return (
    <div
      ref={containerRef}
      className="my-1 px-1 py-12 rounded-xl shadow-md duration-500 h-[80vh] overflow-y-auto"
    >
      {/* Filter Sidebar */}
      <div className="min-w-60 bg-gradient-to-r  rounded-2xl">
        <p
          className="my-2 text-xl flex items-center cursor-pointer bg-green-500 rounded-2xl gap-2 pl-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${
              showFilter ? 'rotate-90' : ''
            }`}
            src={assets.drowdown}
            alt="dropdown"
          />
        </p>

        {/* Categories */}
        <div
          className={`border border-gray-300 sm:block pl-1 py-3 mt-6 ${
            showFilter ? '' : 'hidden sm:block '
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {[
              'Electric & Electronic',
              'Home & Kitchen',
              'Mobile & Laptop',
              'Bag & Luggage',
              'Fashion',
              'Festive & Gift',
              'Daily Needs',
              'Sports',
              'Beauty & Health Care',
              'Project & Toys',
            ].map((cat, idx) => (
              <label className="flex gap-2" key={idx}>
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-sm px-2"
          >
            <option value="relevent">Sort By: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Cards */}
         
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.length > 0 ? (
              filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  discount={item.discount}
                  finalPrice={item.finalPrice}
                  price={item.price}
                  image={item.image}
                />
              ))
            
            
            ) : (
              <p></p>
            )}
          </div>
          {isLoading && (
            <div className=" ">
              <Loading />
            </div>
          )}
         
      </div>
    </div>
  );
};
