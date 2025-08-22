import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { Add } from './page/Add';
import { List } from './page/List';
import { Orders } from './page/Orders';
import { Login } from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Services } from './page/Services.';

// Export backend URL
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log('Backend URL:', backendUrl);
export const currency = '$';

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <>
      <div className="bg-slate-50 min-h-screen font-sans">
        <ToastContainer />
        {token === '' ? (
          <Login setToken={setToken} />
        ) : (
          <>
            {/* Navbar with secondary color */}
            <div className="bg-slate-400 shadow-md">
              <Navbar setToken={setToken} />
            </div>

            <div className="flex w-full">
              {/* Sidebar with dark secondary tone */}
              <div className="bg-slate-400 text-slate-50 w-[18%] min-h-screen shadow-lg">
                <Sidebar />
              </div>

              {/* Main Content Area */}
              <div className="w-[85%] mx-auto text-slate-400">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="/services" element={<Services token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
