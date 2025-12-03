import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import webinar from "../assets/images/webinar.svg";

const Sales = ({ theme }) => {
  // Fade animation only
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
      variants={stagger}
      className="flex flex-col gap-[20px] overflow-y-auto max-h-[500px] py-[10px]"
    >
      {/* Top Banner */}
      <motion.div
        variants={fade}
        className="bg-blue-300 w-full h-[50px] min-h-[40px] rounded-[5px] 
                   flex justify-center items-center gap-[10px]"
      >
        <p className="text-white">
          Welcome Offer 🎉 ₹500 OFF on all plans! – Only 6 days left!
        </p>

        <motion.button
          variants={fade}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[180px] rounded-2xl bg-white shadow-2xs"
        >
          Subscribe Now 🚀
        </motion.button>
      </motion.div>

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
            className="flex items-center justify-between mb-6"
          >      
          <div className="flex items-center gap-[5px]">
          <h1 className="text-2xl font-semibold">
              Sales
             
            </h1>
            <span className="text-pink-600">▶</span>
          </div>
            

            <div className="flex items-center justify-between gap-3">
              <motion.button
                variants={fade}
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
                variants={fade}
               
                className="w-[100px] h-[40px]  bg-fuchsia-800 text-white  text-[14px] shadow rounded-[8px]
                            transition hover:border-[3px] hover:bg-fuchsia-950 font-bold border-fuchsia-300 "
              >
               POS Billing
              </motion.button>
              <motion.button
                variants={fade}
         
                className="px-4 py-2 rounded bg-blue-600 text-white font-medium shadow 
                           hover:bg-blue-700 transition"
              >
              + Create Invoice
              </motion.button>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={stagger}
            className={`w-full flex flex-col lg:flex-row items-center gap-10 p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Illustration */}
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

            {/* Right Content */}
            <motion.div  variants={fade} className="w-full lg:w-1/2">
              <h2 style={{fontFamily:"montserrat"}} className="text-3xl font-semibold leading-tight mb-4">
              Creating invoices lightning fast.
              </h2>

              {/* Features */}
              <motion.ul variants={stagger} className="flex flex-col gap-3 w-full text-[15px]">
                {[
                  "Create invoices in 10 seconds & share them with customers",
                  "Discover templates that are perfect for your business",
                  "Keep track of your day-to-day transactions",
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
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full rounded-[8px] px-6 py-3 bg-blue-600 
                           text-white shadow hover:bg-blue-700 hover:border-[2px] hover:border-blue-500 transition"
              >
                + Create your first invoice
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
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sales;
