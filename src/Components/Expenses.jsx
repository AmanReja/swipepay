import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Offers from "./Offers";

import expensesImg from "../assets/images/webinar.svg" // <-- replace with your actual image

const Expenses = ({ theme }) => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
        variants={fadeIn}
        className={`w-full bg-white rounded-lg ${
          theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
        }`}
      >
        <div className="flex flex-col bg-white dark:bg-gray-900 rounded-[10px] p-4">
          
          {/* Header */}
          <motion.div
            variants={slideLeft}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-semibold">
              Expenses <span className="text-orange-600">▶</span>
            </h1>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "bg-white border-gray-300"
                }`}
              >
                ⚙ Settings
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded bg-orange-600 text-white font-medium shadow 
                           hover:bg-orange-700 transition"
              >
                + Add Expense
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
              variants={slideLeft}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <img
                src={expensesImg}
                alt="Expenses illustration"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div variants={slideRight} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
                Track expenses smartly and stay <br /> on top of your spending.
              </h2>

              <motion.ul
                variants={stagger}
                className="flex flex-col gap-3 text-[15px]"
              >
                {[
                  "Log business expenses with detailed categories",
                  "Automatic syncing with your financial reports",
                  "Monitor your cash outflow in real-time",
                ].map((text, index) => (
                  <motion.li
                    key={index}
                    variants={fadeIn}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-orange-600" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full lg:w-auto px-6 py-3 bg-orange-600 
                           text-white rounded shadow hover:bg-orange-700 transition"
              >
                + Add Expense
              </motion.button>

              {/* Footer CTA */}
              <motion.div
                variants={fadeIn}
                className="mt-5 flex items-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  🎧 <span>Need help?</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                  📺 <span>Watch tutorial</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Expenses;
