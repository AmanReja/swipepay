import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import webinar from "../assets/images/webinar.svg";
import Offers from "./Offers";

const Productandservices = ({ theme }) => {
  // Fade-only animation
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
      initial="hidden"
      animate="show"
      variants={stagger}
      className="flex flex-col gap-[20px] overflow-y-auto max-h-[500px] py-[10px]"
    >
      {/* Top Banner */}
   <Offers></Offers>

      {/* Main Container */}
      <motion.div
        variants={fade}
        className={`w-full bg-white rounded-lg ${
          theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
        }`}
      >
        <div className="flex flex-col bg-white rounded-[10px] dark:bg-gray-900 p-4">
          {/* Header */}
          <motion.div variants={fade} className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold flex gap-1 items-center">
            Products & Services <span className="text-pink-600">▶</span>
            </h1>

            <motion.button
              variants={fade}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded bg-blue-600 text-white font-medium shadow 
              hover:bg-blue-700 transition"
            >
              Connecting to E-invoicing Portal
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <div className="w-full border-b-[0.5px] border-gray-100 h-[30px]">
            <ul className="flex w-[550px] gap-[35px] p-1 items-center h-full 
            text-gray-400 font-medium text-[14px]">
              <li>Items</li>
              <li>Categories</li>
              <li>Groupes</li>
              <li>Price List</li>
              <li>Delete</li>
            </ul>
          </div>

          {/* Search + Filter */}
          <div className="flex w-full mt-[20px] gap-[20px]">
            <div className="flex items-center w-[500px] h-[36px] border rounded-md bg-white 
              hover:ring-black hover:ring-2 transition-all duration-150 border-gray-300 shadow-sm"
            >
              <div className="w-8 flex justify-center items-center text-gray-500">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>

              <input
                placeholder="Search products, category, description, barcode..."
                className="flex-1 h-full text-sm px-1 outline-none bg-transparent"
                type="text"
              />

             
            </div>

            <div className="content-center p-2 flex justify-center items-center rounded-[5px] h-[36px] text-center bg-gray-300">
              Select Category
            </div>
          </div>

          {/* Table Header */}
          <table className="w-full  bg-gray-50 text-[14px] mt-[20px] rounded-tl-[10px] rounded-tr-[10px]">
            <thead className=" h-[50px]">
              <tr className="py-[10px] ">
                <td className="p-4">Item</td>
                <td className="p-4">Qtn</td>
                <td className="p-4">selling Prist #</td>
                <td className="p-4">Purches Price</td>
                <td className="p-4">	
Created By
</td>
                
              </tr>
            </thead>
          </table>

          {/* Content Section */}
          <motion.div
            variants={stagger}
            className={`w-full flex flex-col lg:flex-row min-h-[300px] items-center gap-10 p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
             <motion.div
              variants={fade}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <img
                src={webinar}
                alt="Sales Returns"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>
            <motion.div  variants={fade} className="w-full lg:w-1/2">
              <h2 style={{fontFamily:"montserrat"}} className="text-3xl font-semibold leading-tight mb-4">
              Organize and streamline all your products.
              </h2>

              {/* Features */}
              <motion.ul variants={stagger} className="flex flex-col gap-3 w-full text-[15px]">
                {[
                  "Bulk upload products in a click",
                  " Keep multiple price lists of your products",
                  "Create batches for products and even group them accordingly",
                ].map((text, index) => (
                  <motion.li
                    key={index}
                    variants={fade}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-gray-600" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA Button */}
              <motion.button
                variants={fade}
                
                className="mt-6 w-full rounded-[8px] px-6 py-2 bg-blue-600 
                           text-white shadow hover:bg-blue-700 hover:ring-[2px] hover:ring-blue-500 transition"
              >
                + Add your Products
              </motion.button>

              {/* Footer */}
              <motion.div
                variants={fade}
                className="mt-5 flex flex-col  gap-6 text-sm"
              >
                <div className="flex items-center  gap-2 cursor-pointer">
                  🎧 <span className="hover:underline">Talk to a specialist</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                  📺 <span className="hover:underline">Watch how it works</span>
                </div>
              </motion.div>
            </motion.div>
            {/* Illustration */}
           
          </motion.div>
          <div className="mt-5 bg-blue-100 h-[100px] p-3 flex justify-between items-center rounded-lg">
      <div className="flex flex-col">
      <h3 className="font-bold text-sm mb-1">Batch & Expiry</h3>
      <p className="text-black text-[13px]">
      Manage and organize products in Batches for seamless inventory management.
      </p>
      <div className="flex gap-[5px]">
        <div className="text w-[120px] bg-amber-400"></div>
      <div>Linga Reddy and lakhs of businesses use premium</div>
      </div>
      
      </div>
     
      <div className="flex h-full mb-[40px]   items-center p-3 gap-[5px]">
        <div  className={`px-4 py-2 rounded text-[14px] flex items-center content-center hover:bg-gray-200 font-bold text-gray-600  gap-2  `}>Talk to a specialist</div>
       
      <button className=" w-[100px] py-2 bg-[#fef435] rounded-lg font-bold text-sm">
        Upgrade
      </button>
      </div>
     
    </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default Productandservices;
