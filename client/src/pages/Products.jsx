import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';
import axios from 'axios';

export const Products = () => {
  const { products, search, showSearch, backendUrl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]); // selected categories
  const [sortType, setSortType] = useState('relevent');
  const [loading, setLoading] = useState(true);

  // Handle checkbox toggle → only updates category state
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Apply filters (fetch from backend when categories selected)
  const applyFilter = async () => {
    setLoading(false);
    let productCopy = [...products];

    // Search filter
    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter - fetch from backend
    if (category.length > 0) {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/product/relatedProducts`,
          { category: category } // send array of categories
        );

        console.log(data)

        if (data?.success) {
          productCopy = data.products;
          console.log(productCopy)
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching category filtered products:', err.message);
      }
    }

    // Sorting logic
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
    setLoading(false);
  };

  // Initialize filterProducts when products load
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // Re-apply filters whenever dependency changes
  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 w-full sm:gap-10 pt-12 border-t mx-2">
      {/* Filter Sidebar */}
      <div className="min-w-60 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2 pl-2"
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

        {/* Category Filter */}
        <div
          className={`border border-gray-300 sm:block pl-1 py-3 mt-6 ${
            showFilter ? '' : 'hidden sm:block'
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
                />{' '}
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Listing Area */}
      <div className="flex-1">
        <div className=''>
        <div className="flex justify-between text-base sm:text-2xl mb-4  ">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-1 rounded-2xl  bg-gradient-to-r from-green-500 to-emerald-600 text-sm px-2"
          >
            <option value="relevent">Sort By: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        </div>

        {/* Product Cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-1 gap-0">
          {
          [1,2,3,4,5,6,7,8,9,10].map((i) => (
              <div
               key={i}
             className="flex flex-col items-center justify-center border h-40 w-40  rounded-lg lg:h-48 shadow-sm"

             >
               <img
                 src={assets.spinner} alt="Loading..."
                 className="w-10 h-10 animate-spin"/>
               <p className="text-xs text-gray-800 mt-2">Loading...</p>
             </div>
             ))
            }
        </div>
) :  (
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
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
