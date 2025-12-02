import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import debitnote from "../assets/images/webinar.svg";

const Debitnotes = ({ theme }) => {
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
        className="bg-green-500 w-full h-[50px] min-h-[40px] rounded-[5px] 
                   flex justify-center items-center gap-[10px]"
      >
        <p className="text-white font-medium">
          Special Offer 🎉 Save ₹300 on Debit Note addons!
        </p>

        <motion.button
          variants={fade}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[180px] rounded-2xl bg-white shadow-2xs text-green-600 font-semibold"
        >
          Activate Now 🚀
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
            <h1 className="text-2xl font-semibold">
              Purchase Debit Notes <span className="text-green-600">▶</span>
            </h1>

            <div className="flex items-center gap-3">
              <motion.button
                variants={fade}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "bg-white border-gray-300"
                }`}
              >
                ⚙ Document Settings
              </motion.button>

              <motion.button
                variants={fade}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded bg-green-600 text-white font-medium shadow 
                           hover:bg-green-700 transition"
              >
                + Create Debit Note
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
                src={debitnote}
                alt="Debit Notes"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div variants={fade} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
                Manage purchase returns with<br/> smart debit notes.
              </h2>

              {/* Features */}
              <motion.ul variants={stagger} className="flex flex-col gap-3 text-[15px]">
                {[
                  "Easily adjust purchase returns against vendor bills",
                  "Automatically reflected in GST reports & vendor ledger",
                  "Maintain clean, accurate purchase return workflow",
                ].map((text, index) => (
                  <motion.li
                    key={index}
                    variants={fade}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-green-600" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA Button */}
              <motion.button
                variants={fade}
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full lg:w-auto px-6 py-3 bg-green-600 
                           text-white rounded shadow hover:bg-green-700 transition"
              >
                + Create Debit Note
              </motion.button>

              {/* Footer */}
              <motion.div
                variants={fade}
                className="mt-5 flex items-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  📞 <span>Talk to support</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                  📘 <span>Learn how Debit Notes work</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Debitnotes;
