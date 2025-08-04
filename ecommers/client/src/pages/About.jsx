import React from 'react'
import { assets } from '../assets/assets'
import { Title } from '../components/Title'
import { NewsletterBox } from '../components/NewsletterBox'

export const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.electronics} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quaerat est voluptas voluptatem officiis debitis commodi quisquam deleniti doloremque modi harum exercitationem ab non praesentium nobis architecto mollitia accusamus voluptatibus, distinctio cumque! Expedita hic obcaecati cumque quae, natus dolor aspernatur repudiandae nulla voluptas illum.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, corporis illum amet deserunt voluptatem quod ea laborum accusamus qui quis error inventore soluta beatae, deleniti dolorum sequi? Accusamus nostrum beatae itaque earum repellendus perspiciatis, error impedit delectus, rem eveniet officia velit, sunt quis.</p>
        </div>

      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>

          <div className='flex flex-col md:flex-row text-sm mb-20'>
              <b>Quality Assurance:</b>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil repellendus aspernatur ad excepturi tempore debitis qui? Nesciunt itaque facere libero sed molestias nihil, esse minus, nobis praesentium vel tempore, maiores ad dolores consectetur.</p>
          </div>
      <div className='flex'>

          <div className='border p-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quibusdam facilis, nemo provident saepe aspernatur at ipsa, culpa, fugit dolorem ratione quam. Eum saepe ducimus voluptate quaerat optio omnis velit impedit quasi necessitatibus quibusdam!</p>


          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quibusdam facilis, nemo provident saepe aspernatur at ipsa, culpa, fugit dolorem ratione quam. Eum saepe ducimus voluptate quaerat optio omnis velit impedit quasi necessitatibus quibusdam!</p>

          </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}
