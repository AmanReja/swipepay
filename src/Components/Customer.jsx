import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Offers from "./Offers";
import webinar from "../assets/images/webinar.svg";
import { toast, Toaster } from "sonner";

const Customer = ({ theme }) => {
  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  const stagger = {
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const [isModelOpen, setIsModelOpen] = useState(false);
  const handleModel = () => setIsModelOpen((v) => !v);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showLoginToast");
    if (shouldShow === "true") {
      toast.success("🚀 Login success!", { duration: 2500 });
      localStorage.removeItem("showLoginToast");
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className={`flex ${isModelOpen ? "p-4" : ""} duration-300 flex-col gap-[20px] overflow-y-auto max-h-[500px] py-[10px]`}
      >
        {/* Top Banner */}
        <Offers />

        {/* Main Container */}
        <motion.div
          variants={fade}
          className={`w-full bg-white rounded-lg ${
            theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
          }`}
        >
          <div className={`flex flex-col rounded-[10px] p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            {/* Header */}
            <motion.div variants={fade} className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-[5px]">
                <h1 className="text-[26px] font-bold">Customers</h1>
                <div className="flex bg-blue-500 h-[22px] rounded-full w-[22px] justify-center items-center">
                  <i className="fa-solid text-white text-[12px] fa-user"></i>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <motion.button
                  onClick={handleModel}
                  variants={fade}
                  className={`px-4 py-2 rounded text-[14px] flex items-center content-center font-bold gap-2 hover:bg-gray-200 text-gray-600 ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                  }`}
                >
                  <i className="fa-solid fa-gear"></i> Settings
                </motion.button>

                <motion.button
                  variants={fade}
                  className="px-[10px] h-[36px] rounded bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
                >
                  + Add Customer
                </motion.button>
              </div>
            </motion.div>

            {/* Background Overlay */}
            {isModelOpen && <div onClick={handleModel} className="fixed inset-0 bg-black/70 z-40"></div>}

            {/* Settings Panel */}
            <div
              className={`fixed ${isModelOpen ? "right-0" : "right-[-650px]"} duration-300 transition-all top-0 h-full w-[650px] ${
                theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
              } z-50 shadow-xl flex flex-col`}
            >
              <div
                className={`flex justify-between items-center p-4 pb-3 shadow-md flex-none ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
              >
                <h2 className="text-lg font-semibold">Customer Settings</h2>
                <button onClick={handleModel}>✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 text-sm">
                <p className="opacity-70">Here you can configure customer-related preferences and options.</p>
              </div>

              <div className={`flex justify-end gap-2 p-4 shadow-md flex-none ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                <button onClick={handleModel} className="px-4 py-2 bg-gray-200 rounded-md">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
              </div>
            </div>

            {/* Info Section */}
            <motion.div
              variants={stagger}
              className={`w-full flex flex-col lg:flex-row items-center gap-10 p-6 py-[50px] ${
                theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              }`}
            >
              <motion.div variants={fade} className="w-full lg:w-[40%] flex justify-center">
                <img src={webinar} alt="Customers" className="w-[80%] max-w-[400px] object-contain" />
              </motion.div>

              <motion.div variants={fade} className="w-full lg:w-[60%]">
                <h2 className="text-3xl font-semibold leading-tight mb-4">Manage your customers efficiently.</h2>

                <motion.ul variants={stagger} className="flex flex-col gap-3 w-full text-[15px]">
                  {[
                    "Add and manage customer details effortlessly.",
                    "Track outstanding balances and transaction history.",
                    "Send invoices, reminders, and updates instantly.",
                  ].map((text, i) => (
                    <motion.li key={i} variants={fade} className="flex items-center gap-2">
                      <FaCheckCircle className={theme === "dark" ? "text-gray-300" : "text-gray-600"} />
                      {text}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.button
                  variants={fade}
                  className="mt-6 h-[40px] w-full flex justify-center items-center rounded-[8px] px-6 py-3 bg-blue-600 text-white shadow hover:bg-blue-700 transition"
                >
                  + Add New Customer
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Customer;
