import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import subscriptionPlan from "../assets/images/subscriptions.webp";
import Offers from "./Offers";

const Subscriptions = ({ theme }) => {
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
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-[5px]">
            <h1 className="text-2xl font-semibold">
            Subscriptions 
            </h1><span className="text-purple-600">▶</span>
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
                
                className="px-4 py-2 rounded bg-blue-600 text-white font-medium shadow 
                           hover:bg-blue-700 transition"
              >
                + Create Subscription <i class="fa-solid fa-lock"></i>
              </motion.button>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={fade}
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
                src={subscriptionPlan}
                alt="Subscription Plans"
                className="w-[80%] max-w-[400px] object-contain"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div variants={fade} className="w-full lg:w-1/2">
              <h2 className="text-3xl font-semibold leading-tight mb-4">
                Get more power with premium <br /> subscription plans.
              </h2>

              {/* Features */}
              <motion.ul variants={stagger} className="flex flex-col gap-3 text-[15px]">
                {[
                  "Set up recurring invoicing schedule for your customers",
                  "Create customized billing cycle for your customers",
                  "Automate sending invoices via E-mail",
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
              
                className="mt-6 w-full border-2 hover:border-4 hover:border-blue-800 duration-500 items-center text-center content-center justify-center  flex h-[45px] px-6 bg-blue-600 
                           text-white rounded shadow hover:bg-blue-600 transition-all"
              >
                + Create your first subscription
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

export default Subscriptions;
