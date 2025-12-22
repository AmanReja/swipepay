import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import webinar from "../assets/images/sales.webp"
import Offers from "./Offers";

const Purchase = ({ theme }) => {
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
      className="flex flex-col gap-[20px] overflow-y-auto h-auto py-[10px]"
    >
      {/* Top Banner */}
  <Offers></Offers>

      {/* Main card container */}
      <motion.div
        variants={fade}
        className={`w-full bg-white rounded-lg ${
          theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
        }`}
      >
        <div className="flex flex-col bg-white dark:bg-gray-900 p-4">
          
          {/* Header */}
          <motion.div
            variants={fade}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-[5px]">
            <h1 className="text-2xl font-semibold">
            Purchases 
            </h1>
            <span className="text-green-600">▶</span>
            </div>
           

            <div className="flex items-center gap-3">

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
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
              >
                + Create Purchase
              </motion.button>

            </div>
          </motion.div>

          {/* Content section */}
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
                alt="Purchases Illustration"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right content */}
            <motion.div variants={fade} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
              Purchase invoices made easy.
              </h2>

              <motion.ul variants={stagger} className="flex flex-col gap-3 text-[15px]">
                {[
                  "Record purchases to automatically stock-in inventory",
                  "Get better data insights to your purchases",
                  
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    variants={fade}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-gray-600" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full h-[45px] px-6  bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
              >
                + Create Purchase Bill / Order
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

export default Purchase;
