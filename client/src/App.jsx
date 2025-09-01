import './App.css'
import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';
// import { Product } from './pages/Product'; 
import {ProductLayout} from './components/product/ProductLayout'
 
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { PlaceOrder } from './pages/PlaceOrder';
import { Orders } from './pages/Orders';
import {NavbarLayout } from './components/navbar/NavbarLayout';
import {FooterLayout } from './components/footer/FooterLayout';
import { SearchBar } from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import { HandMade } from './pages/HandMade';
import { ShopContext } from './context/ShopContext';
import { Service } from './pages/Service';
import { MyServices } from './pages/MyServices';
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import {GoogleOAuthProvider} from '@react-oauth/google';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  // const { user} = useContext(ShopContext);
  const GoogleAuthWrapper = ()=>{
    return(
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Login/>
      </GoogleOAuthProvider>
    )
  }
  return (
    <div className="pt-16">
       <ScrollToTop/>
       <ToastContainer/>
       <NavbarLayout/>
       {/* <SearchBar/> */}
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/handMade" element={<HandMade/>} />
          <Route path="/service" element={<Service/>} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<ProductLayout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<GoogleAuthWrapper/>} />
          <Route path="/place-order" element={<PlaceOrder/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/services" element={<MyServices/>} />

       </Routes>
       <FooterLayout/>
    </div>
  );
}

 


export default App;
