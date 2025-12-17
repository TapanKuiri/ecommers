import React from 'react'
import { LatestCollection } from '../components/LatestCollection'
import { BestSeller } from '../components/BestSeller'
import { OurPolicy } from '../components/footer/OurPolicy'

export default function Home   (){
  return (
    <div className='lg:mx-0 md:mx-1 mx-2 '> 
      
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
       
    </div>
  )
}

