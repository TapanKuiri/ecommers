import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { toast } from "react-toastify";
import {jwtDecode} from 'jwt-decode';



export const Login = () => {
    const [currentState , setCurrentState] = useState('Login');

    const { token, setToken, navigate, backendUrl} = useContext(ShopContext);
    
    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');

    const onSubmitHandler = async (event) =>{
      event.preventDefault();
      try{
        if(currentState == 'Sign Up'){
            const response = await axios.post(backendUrl+ '/api/user/register', {name, email, password});
            // console.log(response.data);
            if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem('token', response.data.token)
            }else{
              toast.error(response.data.message);
            }
        }else{
          const response = await axios.post(backendUrl+'/api/user/login', {email, password});
          console.log("response: - ",response.data);
          
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
          
          }else{
            toast.error(response.data.message);
          }
        }

      }catch(err){
        console.log(err);
        toast.error(err.message);
      }
    }

    useEffect(()=>{
      if(token ){
        const decoded = jwtDecode(token);
       if(decoded.role === 'admin'){
         navigate('/admin');
       }else{
        console.log("decoded: ", decoded);
         navigate('/');
       }
      }
    },[token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
          </div>

          {currentState === 'Login' ? '' : <input onChange={(e)=> setName(e.target.value)} type="text" placeholder='Enter your name' required className='w-full px-3 py-2 border border-gray-800'/>}
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your Email' required className='w-full px-3 py-2 border border-gray-800'/>
          <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Enter password' required className='w-full px-3 py-2 border border-gray-800'/>

          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p>Forgot your password?</p>
            {
              currentState === 'Login'
              ? <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
              : <p onClick={()=> setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
            }
          </div>

          <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Login' : 'Sign Up' }</button>

          
    </form>
  )
}
