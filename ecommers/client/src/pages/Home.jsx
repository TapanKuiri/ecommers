import React from 'react'
import { Hero } from '../components/hero'
import { LatestCollection } from '../components/LatestCollection'
import { BestSeller } from '../components/BestSeller'
import { OurPolicy } from '../components/footer/OurPolicy'
import { NewsletterBox } from '../components/NewsletterBox'

export const Home = () => {
  return (
    <div> 
      {/* <Hero/>  */}
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      {/* <NewsletterBox/> */}
    </div>
  )
}
