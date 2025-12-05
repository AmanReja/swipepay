import React from 'react';
import {motion} from "framer-motion"

const Offers = () => {
    const fade = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      };
    
      const stagger = {
        show: {
          transition: { staggerChildren: 0.15 },
        },
      };
  return (
    <motion.div
    variants={fade}
    className="bg-blue-200 w-full h-[50px] min-h-[40px] rounded-[5px] outline-none 
               flex justify-center items-center gap-[10px]"
  >
    <p className="text-black font-bold text-[13px]">
      Welcome Offer 🎉 ₹500 OFF on all plans! – Only 6 days left!
    </p>

    <motion.button
      variants={fade}
  
      className="w-[150px] rounded-2xl bg-white text-black shadow-2xs"
    >
      Update Now 🚀
    </motion.button>
  </motion.div>
  )
}

export default Offers