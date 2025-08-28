import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from "react-toastify"
import { jwtDecode } from 'jwt-decode'
import { assets } from '../assets/assets'
import { useGoogleLogin } from '@react-oauth/google'

export const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [isloading, setIsLoading] = useState(false)

  const { token, setToken, navigate, backendUrl,setProfileImage } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  // ------------------ Manual Login/Signup ------------------
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      let response

      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
      }

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // ------------------ Redirect if logged in ------------------
  useEffect(() => {
    if (token) {
        navigate('/')
    }
  }, [token])

  // ------------------ Google Login ------------------
  const googleLogin = useGoogleLogin({
    onSuccess: async (authResult) => {
      try {
        if (authResult.code) {
          const result = await axios.post(`${backendUrl}/api/user/google`, {
            code: authResult.code,
          })

          if (result.data.success) {
            const { email, name, image } = result.data.user
            // console.log("Google user:", { email, name, image })
            setProfileImage(image);
            const token = result.data.token
            setToken(token)
            localStorage.setItem('token', token);
            // localStorage.setItem('profileImage', image);

          } else {
            toast.error(result.data.message)
          }
        }
      } catch (error) {
        console.error("Error during Google auth:", error)
        toast.error("Google login failed")
      }
    },
    onError: (error) => {
      console.error("Google login error:", error)
      toast.error("Google login failed")
    },
    flow: 'auth-code',

  })

  // ------------------ JSX ------------------
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? null : (
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' required className='w-full px-3 py-2 border border-gray-800' />
      )}
      <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter your Email' required className='w-full px-3 py-2 border border-gray-800' />
      <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password' required className='w-full px-3 py-2 border border-gray-800' />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p>Forgot your password?</p>
        {currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>}
      </div>

      <button
        className="bg-black text-white flex items-center justify-center gap-2 font-light px-8 py-2 mt-4 relative rounded-2xl 
           hover:bg-white hover:text-black hover:border-black 
           active:bg-white active:text-black active:border-black border border-transparent"
      >
        {isloading && (
          <img
            src={assets.spinner}
            alt="loading"
            className="w-5 h-5 animate-spin text-white "
          />
        )}
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>

      <div
        onClick={() => googleLogin()}
        className='w-full relative flex bg-blue-400 items-center justify-center border border-gray-400 py-2 rounded-2xl cursor-pointer mb-10 active:scale-95 duration-200'>
        <img className='absolute w-9 left-2' src={assets.google} alt="" />
        <p className='font-bold hover:text-black text-gray-800 active:text-gray-200'>Login with Google</p>
      </div>
    </form>
  )
}
