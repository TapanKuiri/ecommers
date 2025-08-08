import React from 'react'
import { LatestCollection } from '../components/LatestCollection'
import { BestSeller } from '../components/BestSeller'
import { OurPolicy } from '../components/footer/OurPolicy'

export const Home = () => {
  return (
    <div className=' md:mx-10 mx-2'> 
      
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
       
    </div>
  )
}

