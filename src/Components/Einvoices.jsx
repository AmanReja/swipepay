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
          <div className="w-full border-b-[0.5px] border-gray-100 h-[30px]">
            <ul className="flex w-[550px] gap-[35px] p-1 items-center h-full 
            text-gray-400 font-medium text-[14px]">
              <li>All E-Invoices</li>
              <li>Success</li>
              <li>Pending</li>
              <li>Failed</li>
              <li>Cancelled</li>
            </ul>
          </div>

          {/* Search + Filter */}
          <div className="flex w-full mt-[20px] gap-[20px]">
            <div className="flex items-center w-[500px] h-[36px] border rounded-md bg-white 
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
          <table className="w-full  bg-gray-50 text-[14px] mt-[20px] rounded-tl-[10px] rounded-tr-[10px]">
            <thead className=" h-[50px]">
              <tr className="py-[10px] ">
                <td className="p-4">Amount</td>
                <td className="p-4">Status</td>
                <td className="p-4">Invoice #</td>
                <td className="p-4">Ack No.</td>
                <td className="p-4">Customer</td>
                <td className="p-4">Date/Created Time</td>
                <td className="p-4">Actions</td>
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
            {/* Illustration */}
           
          </motion.div>
          <motion.div
            variants={stagger}
            className={`w-full text-center flex flex-col min-h-[300px] items-center gap-2 p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
         <h1 className="w-full">Generate E-Invoice in less than 10 seconds 🚀</h1>
         <p className="text-green-300">Connect using your NIC credentials and start creating E-Invoices from Sales section in one-click.</p>
         <button className="w-[180px] bg-blue-600 text-white p-2">Go To Sales</button>
           
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Einvoices;
