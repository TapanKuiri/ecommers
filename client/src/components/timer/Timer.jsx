import React from 'react'
import { useState, useEffect } from 'react';

export const Timer = ({allImages}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        const intervelId = setInterval(()=>{
            setCurrentIndex((prevIndex) => (prevIndex +1) % allImages.length);
            // console.log("Rotating banner to index:", (currentIndex + 1) % allImages.length);
        }, 2000);

        return () => clearInterval(intervelId);
    },[]);

  return (
    <div>
       <div className="w-full h-auto md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl transition-all duration-700 relative bg-black">
        <img
          src={allImages[currentIndex]}
          alt="banner"
          className={ `w-full h-full object-contain rounded-xl `}
        />
      </div>

    </div>
  )
}
