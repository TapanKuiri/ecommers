import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { products } from '../assets/assets';
import {Title} from '../components/Title';
import {ProductItem} from '../components/ProductItem';

export const Products = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory]  = useState([]);
  const [sortType, setSortType] = useState(['relevent']);

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item != e.target.value))
    }else{
      setCategory(prev => [...prev, e.target.value])
    }
  }


  const applyFilter = ()=>{
    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    }

    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productCopy);
  }


  const sortProduct = ()=>{
    let fpCopy = filterProducts.slice();
    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)));
        break;
      
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b) => (b.price - a.price)));
          break;
        
        default:
          applyFilter();
          break;
    }
  }

  

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products ]);

  useEffect(()=>{
    sortProduct();
  },[sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
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
              <input className='w-3' type='checkbox' value={'Electrical & Electronics'} onChange={toggleCategory}/> Electrical & Electronics
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Home & Kitchen'} onChange={toggleCategory}/> Home & Kitchen
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Mobile Accessories'} onChange={toggleCategory}/> Mobile Accessories
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Gifts'} onChange={toggleCategory}/> Gifts
            </label>
             <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Art'} onChange={toggleCategory}/> Art
            </label>
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div
          className={`border border-gray-300 sm:block pl-1 py-3 mt-6 ${
            showFilter ? '' : 'hidden sm:block'
          }`}
        >
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Topwear' onChange={toggleCategory} /> Topwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Bottomwear' onChange={toggleCategory} /> Bottomwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type='checkbox' value='Winterwear' onChange={toggleCategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>



      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2 = {'COLLECTIONS'}/>
            {/* product sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevent">Sort By : relevent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          
        </div>

        {/* map products  */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index)=>( 
              <ProductItem key={index} name={item.name} id={item._id}  price={item.price} image={item.image}  />
            ))
          }
        </div>

      </div>

    </div>
  );
};
