import React from "react";
import { assets } from "../../assets/assets";

const ShareButton = ({ productData }) => {
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productData.name,
          text: `Check this product: ${productData.name}`,
          url: `${window.location.origin}/product/${productData._id}`
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
   <button
  onClick={handleShare}
  className="
    p-2 
    rounded-full 
    bg-white/90 
    backdrop-blur 
    shadow-md 
    hover:shadow-lg 
    active:scale-90 
    active:shadow-[0_0_15px_#3b82f6] 
    transition-all 
    duration-200
  "
>
  <img src={assets.shareIcon} alt="shareIcon" className="h-6 w-6" />
</button>

  );
};

export default ShareButton;
