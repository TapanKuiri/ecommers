import React from 'react'

export const NewsletterBox = () => {
    const onSubmitHandler = (event)=>{
        event.preventDefault();
    }

  return (
    <div className='text-center'> 
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-500 mt-3'>Get exclusive offers and news about our latest collection</p>

        <form onClick={onSubmitHandler} className='w-full  sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1  outline-none' required type='email' placeholder='enter your email'/>
            <button type='submit' className=' bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}
