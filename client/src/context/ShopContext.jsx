import React, { createContext, useEffect, useState } from "react"
export const ShopContext = createContext();
import { products } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


// export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '₹';
    const delivery_fee = 10;
    const [search , setSearch ] = useState('');
    const [showSearch, setShowSearch] = useState('false');
    const [cartItems,  setCartItems] = useState({});
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");



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
        // console.log("cartItems : ",cartItems);
 
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        updateCartAndBuy(itemId);

    }
    const getCartCount = ()=>{
        let totalCount = 0;
        // console.log("cart count is called", cartItems);
        // console.log("cartItems my ", products);
        for(const items in cartItems){
            totalCount += cartItems[items];
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]> 0){
                        totalCount += cartItems[items][item];
                    }
                }catch(e){
                    console.log(e);
                }
            }
        }
        return totalCount;
    }

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
      await axios.post(backendUrl + '/api/cart/update', {
        itemId,
        quantity
      }, {
        headers: { token }
      });
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

 const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    let itemInfo = products.find((product) => product._id === itemId);

    if (itemInfo && cartItems[itemId] > 0) {
      totalAmount += itemInfo.finalPrice * cartItems[itemId];
    }
  }

  return totalAmount;
};

// const getProductsData = async (page = 1, limit = 16) => {
//   try {
//     const response = await axios.post(backendUrl + "/api/product/list", {
//       page,
//       limit,
//     });

//     if (response.data.success) {
//       let productsData = response.data.products;

//       // Shuffle products
//       productsData = productsData.sort(() => Math.random() - 0.5);

//       // If first page, replace; else append
//       if (page === 1) {
//         setProducts(productsData);
//       } else {
//         setProducts((prev) => [...prev, ...productsData]);
//       }
//     } else {
//       toast.error(response.data.message);
//     }
//   } catch (err) {
//     console.log(err);
//     toast.error(err.message);
//   }
// };

// const getProductsData = async () => {
//   try {
//     const response = await axios.get(backendUrl + '/api/product/list');

//     if (response.data.success) {
//       // Get products
//       let productsData = response.data.products;

//       // Shuffle products
//       productsData = productsData.sort(() => Math.random() - 0.5);

//       // Set products
//       setProducts(productsData);
//     } else {
//       toast.error(response.data.message);
//     }

//   } catch (err) {
//     console.log(err);
//     toast.error(err.message);
//   }
// };


    // const 

  const getProductsData = async (page = 1, limit = 16) => {

  try {
    const res = await axios.post(`${backendUrl}/api/product/list`, {
      page,
      limit
    });


    if (res.data.success) {
      let productsData = res.data.products;
      productsData = productsData.sort(() => Math.random() - 0.5);

      setProducts(prev =>
        page === 1 ? productsData : [...prev, ...productsData]
      );

      return true;
    } else {
      toast.error(res.data.message);
      return false;
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
    return false;
  }
};

     
    useEffect(()=>{
        // addToCart()
        // console.log("myproducts: ",products);
        getProductsData();
    }, [])
 

    useEffect(()=>{
      if (!token && localStorage.getItem('token')) {
        const savedToken = localStorage.getItem('token');
        if (profileImage) localStorage.setItem("profileImage", profileImage);
        // setProfileImage(localStorage.getItem("profileImage") || "");
        setToken(savedToken);
        getUserCart(savedToken);
      }
    }, [token, profileImage]);




    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity, getProductsData
        ,getCartAmount, navigate, backendUrl, token, setToken, setCartItems, getUserCart,buyHandler
        ,setProfileImage, profileImage
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;