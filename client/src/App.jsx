import './App.css'
import React from 'react';
import './index.css';
import { BrowserRouter, Route  } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Routes } from 'react-router-dom';
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
import { Repair } from './pages/Repair';
import { ShopContext } from './context/ShopContext';
export const backendUrl = import.meta.env.VITE_BACKEND_URL;


function App() {
  // const { user} = useContext(ShopContext);
  return (
    <div className="ml-10 mr-10">
       <ToastContainer/>
       <NavbarLayout/>
       <SearchBar/>
       <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/admin'>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="features" element={<AdminFeatures />} />

          </Route> */}
          <Route path="/products" element={<Products/>} />
          <Route path="/handMade" element={<HandMade/>} />
          <Route path="/repair" element={<Repair/>} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<ProductLayout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/place-order" element={<PlaceOrder/>} />
          <Route path="/orders" element={<Orders/>} />
       </Routes>
       <FooterLayout/>
    </div>
  );
}

 


export default App;
