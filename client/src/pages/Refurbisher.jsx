import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';
import axios from 'axios';
import { Loading } from '../components/loading/Loading';

export default function Refurbisher() {
  const { products, search, backendUrl, page, setPage,hasMore, setHasMore, isLoading, setIsLoading } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  let filterLength = useRef(0);
  const [sortType, setSortType] = useState('relevent');
  // const [isSortClicked, setIsSortClicked] = useState(false);
  // const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const isSortClickedRef = useRef(false);
  const [backgroundColor, serBackgroundColor] = useState(false);


  // Toggle category filter
  const toggleCategory = (e) => {
    const value = e.target.value;
    setPage(1); // Reset to first page on filter change
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // Apply filters
  const applyFilter = async (pageNumber=1) => {
    setIsLoading(true);
    // if ( !hasMore) return;
    // console.log("Products: ", products)
    let productCopy = null;
    if(filterLength.current > 0){
      try {
        const { data } = await axios.post(`${backendUrl}/api/product/relatedProducts`, {
          category, page: pageNumber, limit: 20
        });
       if (data?.success) {
          setFilterProducts((prev) => pageNumber === 1 ? data.products : [...prev, ...data.products]);
          setHasMore(data.hasMore);
        }

      } catch (err) {
        console.error('Error fetching category filtered products:', err.message);
      }

    }else{

      productCopy = [...products];

      setFilterProducts(productCopy);
      setIsLoading(false);
    }

    // Sorting
    if(sortType === 'low-high'){
      isSortClickedRef.current = true;
      filterProducts.sort((a,b) => a.finalPrice - b.finalPrice);
      setIsLoading(false);
      setFilterProducts(filterProducts);
      
    }else if(sortType === 'high-low'){
      isSortClickedRef.current = true;
      filterProducts.sort((a,b) => b.finalPrice - a.finalPrice);
      setIsLoading(false);
      setFilterProducts(filterProducts);
    }else if(sortType === 'relevent'){
      setIsLoading(true);
      isSortClickedRef.current = false;
    }
    
    setIsLoading(false);
  };

  // Re-apply filters
  useEffect(() => {
    filterLength.current = category.length;
    applyFilter(page);
    // if(filterLength.current == 0 ){
      // setPage(1);
      // setFilterProducts(products);
      // return;
    // } 
  }, [category, search, sortType,page]);

  //  Infinite Scroll (inside container)
  const handelInfiniteScroll = () => {
    if(isSortClickedRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPage((prev) => prev + 1); // load next page
    }
  };

   useEffect(()=>{
      setHasMore(true);
    },[])

  useEffect(() => {
      const container = containerRef.current;
      if (!container) return;         
  
      container.addEventListener("scroll", handelInfiniteScroll);
      return () => container.removeEventListener("scroll", handelInfiniteScroll);

  }, [page]);

  return (
    <div
      ref={containerRef}
      className="my-1 px-1 py-2 rounded-xl shadow-md duration-500 h-[80vh] overflow-y-auto"
    >
      {/* Filter Sidebar */}
      <div className="min-w-60 bg-gradient-to-r  rounded-2xl">
        {/* <p
          className="my-2 text-xl flex items-center cursor-pointer bg-green-500 rounded-2xl gap-2 pl-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          Select Service Caegory
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${
              showFilter ? 'rotate-90' : ''
            }`}
            src={assets.dropdown}
            alt="dropdown"
          />
        </p> */}

        {/* Categories */}
        <div
          className={`border border-gray-300 sm:block pl-1 py-3 mt-6 ${
            showFilter ? '' : 'hidden sm:block '
          }`}
        >
          <p className="mb-3  text-center text-sm font-medium">Service CATEGORIES</p>
          <div className="grid  grid-cols-3 lg:mx-20 gap-2 text-sm font-light text-gray-700">
            {[
              'Electrician', 'Plumber', 'Carpenter', 'Ac & Appliance Repair', 'Mobile & Laptop Technician',
              // 'Electric & Electronic',
              // 'Home & Kitchen', 
              // 'Mobile & Laptop',
              // 'Bag & Luggage',
              // 'Fashion',
              // 'Festive & Gift',
              // 'Daily Needs',
              // 'Sports',
              // 'Beauty & Health Care',
              // 'Project & Toys',
            ].map((cat, idx) => (
              <label className={ `flex items-center gap-2 h-16 bg-gray-300 px-2  rounded-2xl`} key={idx}>
                <input
                  className="w-3 "
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                  // onClick={serBackgroundColor((prev) => !prev)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex justify-center text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="SERVICES" />
          {/* <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-sm px-2"
          >
            <option value="relevent">Sort By: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select> */}
        </div>

        {/* Product Cards */}
         
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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

 