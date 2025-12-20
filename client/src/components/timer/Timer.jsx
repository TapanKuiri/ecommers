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
      <div className="relative w-full overflow-hidden rounded-xl mt-2">
   
        <img
          src={allImages[currentIndex]}
          className="relative w-full h-full object-contain"
        />
      </div>

    </div>
  )
}
