import React from 'react';
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar';
import {Routes, Route} from 'react-router-dom';
// import { Add } from '../../client/src/pages/adminPage/pages/Add';
// import { List } from '../../client/src/pages/adminPage/pages/List';
// import { Orders } from '../../client/src/pages/adminPage/pages/Orders';
import { Add } from './page/Add';
import { List } from './page/List';
import { Orders } from './page/Orders';
import { useState } from 'react';
import { Login } from './components/Login';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { Services } from './page/Services.';

// export const backendUrl = import.meta.env.BACKEND_RUL;
// export const backendUrl = import.meta.env.VITE_BACKEND_URL; 
//  http://localhost:4000
// export const backendUrl = 'http://localhost:4000'; 
export const backendUrl = import.meta.env.VITE_BACKEND_URL; // Fallback to localhost if env variable is not set
console.log('Backend URL:', backendUrl);
export const currency = '$';


function App() {
  // const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): '');
  const [token, setToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): '');

  useEffect(()=>{
      localStorage.setItem('token', token);
  }, [token]);

  return (
     <>
     <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === '' ? <Login setToken={setToken} /> : 
      <>
       <Navbar setToken={setToken}/>
       <hr />
       <div className='flex w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add token={token}/>} />
              <Route path='/list' element={<List token={token}/>} />
              <Route path='/orders' element={<Orders token={token}/>} />
              {/* <Route path='/' element={<h1>Welcome to Admin Dashboard</h1>} /> */}
              <Route path='/services' element={<Services token={token}/>}/>
            </Routes>
          </div>
       </div>
      </>}
      
     </div>
     </>
  )
}

export default App
