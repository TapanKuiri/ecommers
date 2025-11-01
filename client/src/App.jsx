import './App.css'
import React, { Suspense, lazy } from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const HandMade = lazy(() => import('./pages/HandMade'));
const Service = lazy(() => import('./pages/Service'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductLayout = lazy(() => import('./components/product/ProductLayout'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Orders = lazy(() => import('./pages/Orders'));
const MyServices = lazy(() => import('./pages/MyServices'));

import { NavbarLayout } from './components/navbar/NavbarLayout';
import { FooterLayout } from './components/footer/FooterLayout';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ScrollToTop } from './components/ScrollToTop';
import { Loading } from './components/loading/Loading';
import { assets } from './assets/assets';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const GoogleAuthWrapper = () => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Login />
    </GoogleOAuthProvider>
  );

  return (
    <div className="pt-16">
      <ScrollToTop />
      <ToastContainer />
      <NavbarLayout />

      <Suspense fallback={<div className="flex justify-center items-center mt-50 mb-40 ">
          <img src={assets.spinner} className="w-20 h-20" alt="Loading..." />
        </div>
        }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/handMade" element={<HandMade />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<ProductLayout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/services" element={<MyServices />} />
        </Routes>
      </Suspense>

      <FooterLayout />
    </div>
  );
}

export default App;
