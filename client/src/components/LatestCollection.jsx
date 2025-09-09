import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Title } from "./Title";
import { ProductItem } from "./ProductItem";
import { assets } from "../assets/assets";
import { Loading } from "./loading/Loading";

export const LatestCollection = () => {
  // Context state coming from ShopContext
  const { products, search, setPage, page, isLoading, hasMore } = useContext(ShopContext);

  // Local state for rotating banner images
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reference to container div for scroll listener
  const containerRef = useRef(null);

  // Array of banner images
  const allImages = [assets.coll1, assets.coll2, assets.coll3, assets.coll4];

  /**
   * Banner auto-rotating effect
   * Changes image every 2 seconds
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Infinite scroll handler
   * Increases page count when user reaches near bottom
   */
  const handleInfiniteScroll = () => {
    try {
      // ✅ Prevent multiple calls if already loading or no more products
      if (!hasMore || isLoading) return;

      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, clientHeight, scrollHeight } = container;

      // When user is near the bottom (5px threshold)
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setPage((prev) => prev + 1);
        console.log("Fetching page:", page + 1);
      }
    } catch (err) {
      console.log("Scroll error:", err);
    }
  };

  /**
   * Attach infinite scroll event listener to the container
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleInfiniteScroll);

    // Cleanup listener when component unmounts
    return () => container.removeEventListener("scroll", handleInfiniteScroll);
  }, [hasMore, isLoading]); // ✅ Re-run if hasMore/isLoading changes

  return (
    <div
      ref={containerRef}
      className="my-1 px-1 py-12 rounded-xl shadow-md duration-500 h-[80vh] overflow-x-hidden"
    >
      {/* Rotating banner - only visible when not searching */}
      {!search && (
        <div className="h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl transition-all duration-700 relative">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={allImages[currentIndex]}
            alt="banner"
          />
        </div>
      )}

      {/* Title Section */}
      <div className="text-center mt-5 pb-8 text-3xl font-semibold text-gray-800 relative">
        <Title text1="LATEST" text2="COLLECTION" />

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 gap-y-7">
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
