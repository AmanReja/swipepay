import React, { useState,useEffect  } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";


import webinar from "../assets/images/sales.webp";
import Offers from "./Offers";
import { toast ,Toaster } from "sonner";

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
  const [isModelOpen, setIsModelOpen] = useState(false);
  const handleModel = () => {
    setIsModelOpen((prev) => !prev);
  };
  console.log(24,isModelOpen);

 
  useEffect(() => {
    const shouldShow = localStorage.getItem("showLoginToast");
  
    if (shouldShow === "true") {
      toast.success("🚀login success!", {
       
        duration: 2500,
      });
  
     
        localStorage.removeItem("showLoginToast");
      
    }
  }, []);



  return (

<>

<Toaster
  position="top-right"
  richColors
  closeButton
  toastOptions={{
    style: {
      borderRadius: "12px",
      fontSize: "14px",
      padding: "12px 16px",
      background: "linear-gradient(135deg, #654ea3, #4e54c8)",
      color: "#fff",
      boxShadow:
        "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(8px)",
    },
    className: "modern-toast",
  }}
/>



   <motion.div
  initial="hidden"
  animate="show"
  variants={fade}
  className={`flex  ${isModelOpen ? "p-4" : ""} duration-300 flex-col gap-[20px]  h-auto py-[10px]`}
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
    <div
      className={`flex flex-col rounded-[10px] p-4 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Header */}
      <motion.div variants={fade} className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-[5px]">
          <h1 className="text-[26px] font-bold">Sales</h1>

          <div className="flex bg-pink-500 h-[22px] rounded-full w-[22px] justify-center items-center">
            <i className="fa-solid text-white text-[12px] fa-play"></i>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Button 1 */}
          <motion.button
            onClick={handleModel}
            variants={fade}
            className={`px-4 py-2 rounded text-[14px] flex items-center content-center font-bold gap-2 hover:bg-gray-200 text-gray-600 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <i className="fa-solid fa-gear"></i> Document Settings
          </motion.button>

          {/* Button 2 */}
          <motion.button
            variants={fade}
            className="w-[100px] h-[36px] bg-[#a4419f] text-white text-[14px] shadow rounded-[8px]
            transition hover:ring-3 hover:bg-[#673a65] hover:ring-[#be8fbb] font-bold border-fuchsia-300"
          >
            POS Billing
          </motion.button>

          {/* Button 3 */}
          <motion.button
            variants={fade}
            className="px-[10px] h-[36px] rounded hover:scale-108 bg-blue-600 text-white font-medium shadow 
            hover:bg-blue-700 transition"
          >
            + Create Invoice
          </motion.button>
        </div>
      </motion.div>

      {/* Background Overlay */}
      {isModelOpen && (
        <div onClick={handleModel} className="fixed inset-0 bg-black/70 z-40"></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed ${
          isModelOpen ? "right-0" : "right-[-650px]"
        } duration-300 transition-all top-0 h-full w-[650px] ${
          theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
        } z-50 shadow-xl flex flex-col`}
      >
        {/* ---- FIXED HEADER ---- */}
        <div
          className={`flex justify-between items-center p-4 pb-3 shadow-md flex-none ${
            theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Document Settings</h2>
          <button onClick={handleModel}>✕</button>
        </div>

        {/* ---- SCROLLABLE CONTENT ---- */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Buttons */}
          <div
            className={`flex items-center gap-2 flex-wrap mt-4 ${
              theme === "dark" ? "text-gray-100" : "text-black"
            }`}
          >
            <button className="px-3 py-1.5 rounded-[5px] hover:ring-1 hover:ring-blue-400 border-blue-800 border-[1px] text-sm">
              ❤️ Invoice Templates
            </button>

            <button className="px-3 py-1.5 rounded-[5px] hover:ring-1 hover:ring-blue-400 border-blue-800 border-[1px] text-sm">
              ⚙️ Add Custom Fields 🔒
            </button>

            <button className="px-3 py-1.5 rounded-[5px] hover:ring-1 hover:ring-blue-400 border-blue-800 border-[1px] text-sm">
              💬 Email | WhatsApp | SMS
            </button>
          </div>

          {/* Prefix Section */}
          <div
            className={`mt-5 p-3 flex items-center rounded-lg ${
              theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white"
            }`}
          >
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm mb-1">Document Prefixes & Suffixes</h3>
              <p className="text-gray-500 text-xs">
                Add multiple prefixes and suffixes for all your documents...
              </p>
            </div>

            <button className="mt-3 w-full py-2 bg-[#ffe3ac] rounded-lg font-medium text-sm">
              ➕ Add Prefixes/Suffixes
            </button>
          </div>

          {/* Additional Customizations */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Additional Customizations</h3>
              <span className="text-gray-400 text-sm">⚙️ Customize Invoice Labels 🔒</span>
            </div>

            <div className="flex flex-wrap gap-3 p-2 mt-4">
              {/* CARD 1 */}
              <div
                className={`shadow-sm w-[180px] h-[180px] p-4 rounded-xl hover:shadow-md transition ${
                  theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white"
                }`}
              >
                <label className="flex items-center justify-between text-sm font-medium">
                  Show Images
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                  Company Details will not be shown...
                </p>
              </div>

              {/* CARD 2 */}
              <div
                className={`shadow-sm w-[180px] h-[180px] p-4 rounded-xl hover:shadow-md transition ${
                  theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white"
                }`}
              >
                <label className="flex items-center justify-between text-sm font-medium">
                  Show Net Balance
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                  HSN/SAC Summary...
                </p>
              </div>

              {/* CARD 3 */}
              <div
                className={`shadow-sm w-[180px] h-[180px] p-4 rounded-xl hover:shadow-md transition ${
                  theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white"
                }`}
              >
                <label className="flex items-center justify-between text-sm font-medium">
                  Show Due Date
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                  Applicable to all templates...
                </p>
              </div>

              {/* CARD 4 */}
              <div
                className={`shadow-sm w-[180px] h-[180px] p-4 rounded-xl hover:shadow-md transition ${
                  theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white"
                }`}
              >
                <label className="flex items-center justify-between text-sm font-medium">
                  Show Dispatch Address
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
                    <div className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                  Show dispatch address in invoices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- FIXED FOOTER ---- */}
        <div
          className={`flex justify-end gap-2 p-4 shadow-md flex-none ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={handleModel}>
            Close
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Update Settings
          </button>
        </div>
      </div>

      {/* Content Section */}
      <motion.div
        variants={stagger}
        className={`w-full flex flex-col lg:flex-row items-center gap-10 p-6 py-[50px] ${
          theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Illustration */}
        <motion.div variants={fade} className="w-full lg:w-[40%] flex justify-center">
          <img src={webinar} alt="Sales Returns" className="w-[80%] max-w-[400px] object-contain" />
        </motion.div>

        {/* Right Content */}
        <motion.div variants={fade} className="w-full lg:w-[60%]">
          <h2 className="text-3xl font-semibold leading-tight mb-4" style={{ fontFamily: "montserrat" }}>
            Creating invoices lightning fast.
          </h2>

          <motion.ul variants={stagger} className="flex flex-col gap-3 w-full text-[15px]">
            {[
              "Create invoices in 10 seconds & share them with customers",
              "Discover templates that are perfect for your business",
              "Keep track of your day-to-day transactions",
            ].map((text, index) => (
              <motion.li key={index} variants={fade} className="flex items-center gap-2">
                <FaCheckCircle className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
                {text}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.button
            variants={fade}
            className="mt-6 h-[40px] w-full flex justify-center items-center rounded-[8px] px-6 py-3 bg-blue-600 
            text-white shadow hover:bg-blue-700 hover:ring-3 hover:ring-blue-600 transition"
          >
            + Create your first invoice
          </motion.button>

          {/* Footer */}
          <motion.div variants={fade} className="mt-5 flex flex-col gap-6 text-sm">
            <div className="flex items-center gap-2 cursor-pointer">
              🎧 <span className="hover:underline">Talk to a specialist</span>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <i className="fa-brands fa-youtube text-red-500"></i>{" "}
              <span className="hover:underline">Watch how it works</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>

  

</motion.div></>

  );
};

export default Sales;
