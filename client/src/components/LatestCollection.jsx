import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "./Title";
import { ProductItem } from "./ProductItem";
import { assets } from "../assets/assets";
import { Loading } from "./loading/Loading";
import { Timer } from "./timer/Timer";
import { useLocation } from "react-router-dom";

export const LatestCollection =  () => {
  const { products, search, setPage, isLoading, hasMore, currentPositionRef,setHasMore } = useContext(ShopContext);
  const {pathname } = useLocation(); 
 
  // Reference to container div for scroll listener
  const containerRef = useRef(null);

  // Array of banner images
  const allImages = [assets.h1, assets.h4, assets.h5, assets.h2, assets.h3];
  // const allImages = [assets.img1, assets.img2, assets.img3, assets.img4];
// 
  
  const handleInfiniteScroll = () => {
    try {
      // if (!hasMore || isLoading) return;
      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, clientHeight, scrollHeight } = container;
      currentPositionRef.current = scrollTop;

      // When user is near the bottom (5px threshold)
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log("Scroll error:", err);
    }
  };

  useEffect(() => {
      if (containerRef.current) {
          containerRef.current.scrollTop = currentPositionRef.current;
      }
  }, [pathname]);

  useEffect(()=>{
    setHasMore(true);
  },[])

  //   Attach infinite scroll event listener to the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleInfiniteScroll);
    // Cleanup listener when component unmounts
    return () =>{
        container.removeEventListener("scroll", handleInfiniteScroll);
    }  
  }, [hasMore, isLoading]); //  Re-run if hasMore/isLoading changes

  return (
    <div
      ref={containerRef}
      className="my-1 px-1  py-7 lg:py-1 rounded-xl shadow-md duration-500 h-[90vh] overflow-x-hidden"
    >

      

      {/* Rotating banner - only visible when not searching */}
      {!search && ( <Timer allImages={allImages}/>)}

      <div className="flex justify-center bg-amber-300 gap-3 text-gray-700 mt-6 mb-4 text-sm sm:text-base">

          {/* Seller Registration */}
          {/* <a
            // href="https://docs.google.com/forms/d/e/1FAIpQLScn9kq3SUIyRDsQi4aTWaLurEbmkVcxzLbWG3XcXnSqm9s8NQ/viewform?usp=dialog" 
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdKzu1BHP_pBPkkqrkLMZsX2cGci0A2xp3RLrZnssgdyWntAg/viewform?usp=header"
            rel="noopener noreferrer"
            className="px-5 py-3 border-2 border-blue-500 rounded-lg font-medium
                      transition-all duration-300 hover:bg-blue-500 hover:text-white
                      hover:shadow-lg hover:shadow-blue-300
                      transform hover:-translate-y-1 hover:scale-105"
          >
            Sell your old products
          </a> */}

          {/* Service Partner Registration */}
          {/* <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd2-ge48KmptIRVtPqM2TFl15pYrqhSDNXNtz3296L9VX7wCw/viewform?usp=publish-editor"
            target=" "
            rel="noopener noreferrer"
            className="px-5 py-3 border-2 border-green-500 rounded-lg font-medium
                      transition-all duration-300 hover:bg-green-500 hover:text-white
                      hover:shadow-lg hover:shadow-green-300
                      transform hover:-translate-y-1 hover:scale-105"
          >
            Register as a Service Partner
          </a> */}

        </div>



      {/* Title Section */}
      <div className="text-center   pt-0 lg:px-2 pb-8 text-3xl font-semibold text-gray-800 relative">
        <Title text1="EXPLORE" text2="SERVICES" />

        {/* Products Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-1 gap-y-7">
          {products.length > 0 ? (
            products.map((item) => (
              <div
                key={item._id}
                className="transition-transform transform overflow-hidden  "
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
            // No products case
            <p></p>
          )}
        </div>

        {/* Loading indicator - only show when fetching and still hasMore */}
        {isLoading && hasMore && (
          <div className="mt-6">
            <Loading />
          </div>
        )}

        
      </div>
    </div>
  );
};
