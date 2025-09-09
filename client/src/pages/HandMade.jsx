import React, { useState, useEffect, useRef, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { ProductItem } from "../components/ProductItem";
import { assets } from "../assets/assets";
import { Loading } from "../components/loading/Loading";
import axios from "axios";

export const HandMade = () => {
  const { backendUrl, search,  searchFilteredProducts } = useContext(ShopContext);

  const [myProducts, setMyProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef(null);

  // Fetch products by page
  const fetchHandMadeProducts = async () => {
    try {
      setIsLoading(true);
      // if(!search){
        
        const { data } = await axios.post(`${backendUrl}/api/product/relatedProducts`, {
          category: "Hand Made",
          page,
          limit: 50, // adjust as needed
        });
      

      if (data.success) {
        const newProducts = data.products || [];
        if (newProducts.length === 0) {
          setHasMore(false);
        } else {
          setMyProducts((prev) => [...prev, ...newProducts]);
        }
      }
    // }else{
    //   setMyProducts(searchFilteredProducts);
    // }
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching handmade products:", err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHandMadeProducts();
  }, [page]);

  // Infinite scroll
  const handleInfiniteScroll = () => {
    try {
      const container = containerRef.current;
      if (!container || !hasMore || isLoading) return;

      const { scrollTop, clientHeight, scrollHeight } = container;

      console.log(scrollTop, clientHeight, scrollHeight)

      if (scrollTop + clientHeight >= scrollHeight - 5) {
        console.log("Reached bottom ✅");
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleInfiniteScroll);
    return () => container.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-1 px-1 py-12 rounded-xl shadow-md duration-500 h-[80vh] overflow-y-auto"
    >
      <div className="text-center mt-5 pb-8 text-3xl font-semibold text-gray-800 relative">
        {isLoading && myProducts.length === 0 ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-7">
            {myProducts.length > 0 ? (
              myProducts.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform transform overflow-hidden"
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
              <p className="col-span-full text-gray-500 text-lg mt-10">
                No handmade products found 😞
              </p>
            )}
          </div>
        )}

        {/* Spinner at bottom for new pages */}
        {isLoading && myProducts.length > 0 && (
          <div className="flex justify-center py-4">
            <img
              src={assets.spinner}
              alt="Loading..."
              className="w-10 h-10 animate-spin"
            />
          </div>
        )}
      </div>
    </div>
  );
};
