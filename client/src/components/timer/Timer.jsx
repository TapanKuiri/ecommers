import React from 'react'
import { useState, useEffect } from 'react';

export const Timer = ({allImages}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // console.log("All images in Timer:", allImages[0]);

    useEffect(()=>{
        const intervelId = setInterval(()=>{
            setCurrentIndex((prevIndex) => (prevIndex +1) % allImages.length);
            console.log("Rotating banner to index:", (currentIndex + 1) % allImages.length);
        }, 2000);

        return () => clearInterval(intervelId);
    },[]);

  return (
    <div>
       <div className="h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl transition-all duration-700 relative">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={allImages[currentIndex]}
            alt="banner"
          />
        </div>
    </div>
  )
}
