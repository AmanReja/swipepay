import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import credit from "../assets/images/sales.webp"// Replace with your actual image
import Offers from "./Offers";

const Creditnotes = ({ theme }) => {
  // Animation Variants
  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
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
      variants={fade}
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
          <motion.div
            variants={fade}
            className="flex items-center  justify-between mb-6"
          >  
         <div className="flex items-center gap-[5px]">
          <h1 className="text-[26px] font-bold ">
          Sales Returns / Credit Notes
             
            </h1>
            <div className="flex bg-pink-500 h-[22px] rounded-full w-[22px] justify-center items-center">
            <i class="fa-solid text-white text-[12px] fa-play"></i>
            </div>
         
           
          </div>
            
            

            <div className="flex items-center gap-3">
            <motion.button
                variants={stagger}
                // whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded text-[14px] flex items-center content-center hover:bg-gray-200 font-bold text-gray-600  gap-2  ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "bg-white border-gray-300"
                }`}
              >
              <i class="fa-solid fa-gear"></i> Document Settings
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className=" h-[32px] px-[8px] text-[14px] rounded bg-blue-600 text-white font-bold shadow 
                           hover:bg-blue-700 transition"
              >
                + Create Seals Return/Credit Note
              </motion.button>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={stagger}
            className={`w-full flex flex-col lg:flex-row items-center gap-10 p-6  py-[50px] ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Illustration */}
            <motion.div
              variants={stagger}
              className="w-full lg:w-[40%] flex justify-center"
            >
              <img
                src={credit}
                alt="Credit Note"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div variants={stagger} className="w-full lg:w-[60%]">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
              Simplify returns, amplify customer satisfaction.
              </h2>

              {/* Features */}
              <motion.ul variants={stagger} className="flex flex-col gap-3 text-[15px]">
                {[
                  "Easily convert your invoices into sales return",
                  "Automatically adjusted with your Tax reports & Customer ledgers",
                  "Manage your sales return for better financial reporting",
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
                variants={stagger}
              
                className="mt-6 h-[40px] flex justify-center items-center w-full rounded-[8px] px-6 py-3 bg-blue-600 
                           text-white shadow hover:bg-blue-700 hover:ring-3  hover:ring-blue-600 transition"
              >+ Create Seals Return/Credit Note
              </motion.button>

              {/* Footer */}
              <motion.div
                variants={stagger}
                className="mt-5 flex flex-col  gap-6 text-sm"
              >
                <div className="flex items-center  gap-2 cursor-pointer">
                  🎧 <span className="hover:underline">Talk to a specialist</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                <i class="fa-brands fa-youtube text-red-500" ></i>  <span className="hover:underline">Watch how it works</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Creditnotes;
