import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import webinar from "../assets/images/webinar.svg";

const Einvoices = ({ theme }) => {
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
          <motion.div variants={fade} className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold flex gap-1 items-center">
              E-Invoicing <span className="text-pink-600">▶</span>
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
          <div className="w-full border-b-[1px] border-gray-300 h-[30px]">
            <ul className="flex w-[500px] gap-[10px] p-1 items-center h-full 
            text-gray-400 font-semibold text-[14px]">
              <li>All E-Invoices</li>
              <li>Success</li>
              <li>Pending</li>
              <li>Failed</li>
              <li>Cancelled</li>
            </ul>
          </div>

          {/* Search + Filter */}
          <div className="flex w-full mt-[20px] gap-[20px]">
            <div className="flex items-center w-[400px] h-[36px] border rounded-md bg-white 
              hover:border-black transition-all duration-150 border-gray-300 shadow-sm"
            >
              <div className="w-8 flex justify-center items-center text-gray-500">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>

              <input
                placeholder="Ask Swip AI"
                className="flex-1 h-full text-sm px-1 outline-none bg-transparent"
                type="text"
              />

              <div className="px-2 text-xs text-gray-600 bg-gray-100 rounded mr-2">
                + CTRL
              </div>
            </div>

            <div className="content-center p-1 rounded-[5px] h-[36px] text-center bg-gray-300">
              Yesterday
            </div>
          </div>

          {/* Table Header */}
          <table className="w-full bg-gray-50 text-[14px] mt-[20px]">
            <thead>
              <tr className="py-[10px]">
                <td>Amount</td>
                <td>Status</td>
                <td>Invoice #</td>
                <td>Ack No.</td>
                <td>Customer</td>
                <td>Date/Created Time</td>
                <td>Actions</td>
              </tr>
            </thead>
          </table>

          {/* Content Section */}
          <motion.div
            variants={stagger}
            className={`w-full flex flex-col lg:flex-row items-center gap-10 p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Illustration */}
            <motion.div variants={fade} className="w-full lg:w-1/2 flex justify-center">
              <img
                src={webinar}
                alt="Sales Returns"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div variants={fade} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
                Simplify returns, amplify customer <br /> satisfaction.
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
                    <FaCheckCircle className="text-blue-600" />
                    {text}
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <motion.button
                variants={fade}
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full lg:w-auto px-6 py-3 bg-blue-600 
                text-white rounded shadow hover:bg-blue-700 transition"
              >
                + Create Sales return / Credit note
              </motion.button>

              {/* Footer */}
              <motion.div variants={fade} className="mt-5 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 cursor-pointer">
                  🎧 <span>Talk to a specialist</span>
                </div>

                <div className="flex items-center gap-2 cursor-pointer">
                  📺 <span>Watch how it works</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Einvoices;
