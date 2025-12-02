import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import creditNoteImg from "../assets/images/webinar.svg"// Replace with your actual image

const Creditnotes = ({ theme }) => {
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
      transition: { staggerChildren: 0.15 }
    }
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
        variants={fadeIn}
        className="bg-purple-400 w-full h-[50px] min-h-[40px] rounded-[5px] 
                   flex justify-center items-center gap-[10px]"
      >
        <p className="text-white font-medium">
          Limited Offer ✨ Flat ₹500 OFF on all premium plans!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[180px] rounded-2xl bg-white shadow-2xs"
        >
          Upgrade Now 🚀
        </motion.button>
      </motion.div>

      {/* Main Container */}
      <motion.div
        variants={fadeIn}
        className={`w-full bg-white rounded-lg ${
          theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
        }`}
      >
        <div className="flex flex-col bg-white rounded-[10px] dark:bg-gray-900 p-4">

          {/* Header */}
          <motion.div
            variants={slideLeft}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-semibold">
              Credit Notes{" "}
              <span className="text-purple-600">▶</span>
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
                ⚙ Document Settings
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded bg-purple-600 text-white font-medium shadow 
                           hover:bg-purple-700 transition"
              >
                + Create Credit Note
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
                src={creditNoteImg}
                alt="Credit Note"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div variants={slideRight} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
                Issue credit notes easily and maintain <br /> accurate accounts.
              </h2>

              {/* Features */}
              <motion.ul variants={stagger} className="flex flex-col gap-3 text-[15px]">
                {[
                  "Create credit notes linked directly to invoices",
                  "Automatically adjust customer balances & GST returns",
                  "Track all customer credit and adjustments seamlessly",
                ].map((text, index) => (
                  <motion.li
                    key={index}
                    variants={fadeIn}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-purple-600" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full lg:w-auto px-6 py-3 bg-purple-600 
                           text-white rounded shadow hover:bg-purple-700 transition"
              >
                + Create Credit Note
              </motion.button>

              {/* Footer */}
              <motion.div
                variants={fadeIn}
                className="mt-5 flex items-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  🎧 <span>Talk to a specialist</span>
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

export default Creditnotes;
