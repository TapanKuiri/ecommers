import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';

export const Products = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevent'); // fixed from ['relevent']

  // ✅ Toggle selected categories (normalized to lowercase)
  const toggleCategory = (e) => {
    const value = e.target.value.toLowerCase();
     if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };
 
  // ✅ Filter products based on search and selected categories
  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      console.log("productCopy becour", productCopy);
      productCopy = productCopy.filter(item => {
        console.log("category", category);
        console.log("item.category:", item.category );

        return category.includes(item.category?.toLowerCase());
      });

      console.log("productCopy after", productCopy);
      
    }

    setFilterProducts(productCopy);
  };

  // ✅ Sort filtered products
  const sortProduct = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Sidebar */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${
              showFilter ? 'rotate-90' : ''
            }`}
            src={assets.drowdown}
            alt='dropdown'
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 sm:block pl-1 py-3 mt-6 ${
            showFilter ? '' : 'hidden sm:block'
          }`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Electric & Electronic' onChange={toggleCategory} /> Electric & Electronic
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='home & kitchen' onChange={toggleCategory} /> Home & Kitchen
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Mobile & Laptop' onChange={toggleCategory} /> Mobile & Laptop
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='bag & luggage' onChange={toggleCategory} /> Bag & Luggage
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='fasion' onChange={toggleCategory} /> Fashion
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='festive & gift' onChange={toggleCategory} /> Festive & Gift
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='daily needs' onChange={toggleCategory} /> Daily Needs
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='sports' onChange={toggleCategory} /> Sports
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='beauty & health care' onChange={toggleCategory} /> Beauty & Health Care
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='project & toys' onChange={toggleCategory} /> Project & Toys
            </label>
          </div>
        </div>
      </div>

      {/* Product Listing Area */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='ALL' text2='COLLECTIONS' />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relevent'>Sort By: Relevent</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              discount={item.discount}
              finalPrice={item.finalPrice}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
