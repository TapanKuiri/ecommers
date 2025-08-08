import React from 'react'
import { assets } from '../../assets/assets'

export const ProductImages = ({productData, setImage, image}) => {
  // console.log("data", productData)

  return (
    <div>
        <div className='flex-1 flex flex-col-reverse  gap-3 mx-1 sm:flex-row'>
              <div className='flex sm:flex-col  overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
                    {
                      productData.image.map((item, index)=>{
                       return <img onClick={()=> setImage(item)}
                        src={item} alt="img" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer '/>
                      })
                    }
              </div>


              <div className='w-full sm:w-[80%]'>
                <img src={image} alt="image"  className='w-full h-auto'/>

              </div>

          </div>
    </div>
  )
}
