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
import { Art } from './pages/Art';



function App() {
  return (
    <div className="m-2">
       <ToastContainer/>
       <NavbarLayout/>
       <SearchBar/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products/>} />
          <Route path="/art" element={<Art />} />
          
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
