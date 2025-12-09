import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useRef } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Global states
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [products, setProducts] = useState([]); // displayed products
  const [allProducts, setAllProducts] = useState([]); // backup for restoring after search
  const [searchFilteredProducts, setSearchFilterProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [productClicked, setProductClicked] =  useState(false);
  const [totalCartAmount, setTotalCartAmount] = useState(0); 
  const currentPositionRef = useRef(0);
  const clickedProductIDRef = useRef(null);
  

  const navigate = useNavigate();

  // -------------------- CART FUNCTIONS --------------------
   const updateCartAndBuy = async(itemId)=> {
    try {
            const response = await axios.post(backendUrl + '/api/cart/add', { itemId }, {
                headers: { token }
            });
        } catch (err) {
            console.log("error here")
            console.error(err);
            toast.error(err.message);
        }
  }

 const buyHandler = async (itemId) => {
    let cartData = structuredClone(cartItems);
  // Add item to cart

  // Optionally, if you need size handling in cart
  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  setCartItems(cartData);
  updateCartAndBuy(itemId);
  navigate('/cart');
};

   const addToCart= async (itemId)=>{
    if(!token){
        navigate('/login');
        return;
    }  
        // console.log("cartItems : ",cartItems);
        let cartData = structuredClone(cartItems);
 
        if (cartData[itemId]) {
            cartData[itemId] ++;
        } else {
            cartData[itemId] = 1;
        }
         
        setCartItems(cartData);
        updateCartAndBuy(itemId);

    }

  const updateQuantity = async (itemId, quantity) => {
  // Clone cartItems and update quantity
  let cartData = structuredClone(cartItems);

  if (quantity === 0) {
    delete cartData[itemId];
  } else {
    cartData[itemId] = quantity;
  }

  setCartItems(cartData);

  try {
    if (token) {
      await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, {headers: { token }});
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

const getCartCount = () =>{
         
        let totalCount = 0;
        for(const items in cartItems){
            totalCount += cartItems[items];
        }
        return totalCount;
}

  const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    // let itemInfo = products.find((product) => product._id === itemId);

    // if (itemInfo && cartItems[itemId] > 0) {
    //   totalAmount += itemInfo.finalPrice * cartItems[itemId];
    // }

    try{
      // const response
    }catch(err){

    }
  }

  return parseFloat(totalAmount.toFixed(2));
};
  

   const getUserCart = async (token) => {
  try {
    const response = await axios.post(backendUrl + '/api/cart/get', {}, {
      headers: { token }
    });

    if (response.data.success) {
      setCartItems(response.data.cartData); // cartData = { itemId: quantity }
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};


  // -------------------- PRODUCTS (INFINITE SCROLL) --------------------
  const getProductsData = async (pageNumber = 1) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/product/list`, {
        page: pageNumber,
        limit: 20,
      });


      if (response.data.success) { 
        const productsData = response.data.products;

        setProducts((prev) =>
          pageNumber === 1 ? productsData : [...prev, ...productsData]
        );
        setAllProducts((prev) =>
          pageNumber === 1 ? productsData : [...prev, ...productsData]
        );

        setHasMore(response.data.hasMore);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      // setTimeout(() => setIsLoading(false), 0000);
      setIsLoading(false)
    }
  };

  useEffect(()=>{
    if(token){
      getUserCart(token);
    }
  },[token])

  // -------------------- SEARCH LOGIC --------------------
  useEffect(() => {
    if (!search) {
      // Case 1: Search cleared
      setProducts(allProducts);
      setHasMore(true);
    } else if (search && searchFilteredProducts.length > 0) {
      // Case 2: Search has results
      setProducts(searchFilteredProducts);
      setHasMore(false);
    } else if (search && searchFilteredProducts.length === 0) {
      // Case 3: Search active but no results
      setProducts([]);
      setHasMore(false);
    }
  }, [search, searchFilteredProducts, allProducts]);

  // -------------------- TRIGGER PRODUCT FETCH --------------------
  useEffect(() => {
    if (page >= 1 && searchFilteredProducts.length === 0) {
      // console.log("hasMore:", hasMore, "isLoading:", isLoading);
      getProductsData(page);
    }
  }, [page, searchFilteredProducts]);

  // -------------------- TOKEN HANDLING --------------------
    useEffect(()=>{
      if (!token && localStorage.getItem('token')) {
        const savedToken = localStorage.getItem('token');
        setProfileImage(localStorage.getItem("profileImage"));
        setToken(savedToken);
        getUserCart(savedToken);
      }
    }, [token, profileImage]);

  // -------------------- CONTEXT VALUE --------------------
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    buyHandler,
    updateQuantity,
    getCartCount,
    getCartAmount,
    getUserCart,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    setProfileImage,
    profileImage,
    setProducts,
    searchFilteredProducts,
    setSearchFilterProducts,
    page,
    setPage,
    isLoading,
    setIsLoading,
    hasMore,
    setHasMore,
    setProductClicked,
    productClicked,
    setTotalCartAmount,
    totalCartAmount,
    currentPositionRef,
    clickedProductIDRef
    
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;