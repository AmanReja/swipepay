import {React,useState,useEffect,useRef} from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import webinar from "../assets/images/webinar.svg";
import Offers from "./Offers";

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


  const tabs = ["All E-Invoices", "Success", "Pending", "Failed", "Cancelled"];
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [active, setActive] = useState(0);

useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [active]);

  const invoiceRows = [
    {
      amount: "100.0",
      status: "PENDING",
      invoice: "INV-001",
      ack: "ACK-5848",
      customer: "Aman Kumar",
      date: "27 Nov 2025, 10:36",
      actions: "Actions",
    },
    {
      amount: "240.0",
      status: "SUCCESS",
      invoice: "INV-002",
      ack: "ACK-2392",
      customer: "Rohit Sharma",
      date: "27 Nov 2025, 09:11",
      actions: "Actions",
    },
  ];
  


  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="flex flex-col gap-[20px] overflow-y-auto  h-auto py-[10px]"
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
          <motion.div variants={fade} className="flex items-center justify-between mb-6">
            <div className="flex justify-center items-center gap-[5px]">
            <h1 className="text-2xl font-semibold flex gap-1 items-center">
              E-Invoicing 
            </h1>
            <div className="flex bg-pink-500 h-[25px] rounded-full w-[25px] justify-center items-center">
            <i class="fa-solid text-white fa-play"></i>
            </div>
            
            </div>
          

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
          <div className="relative  pb-1 w-[550px]">
      <ul className="flex gap-[35px] text-gray-400 font-medium text-[14px] relative">
        {tabs.map((t, i) => (
          <li
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            onClick={() => setActive(i)}
            className={`cursor-pointer pb-2 ${
              active === i ? "text-blue-500 font-semibold" : ""
            }`}
          >
            {t}
          </li>
        ))}

        {/* Sliding Underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-blue-500 rounded-full transition-all duration-300"
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        ></div>
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
      
    <div className="w-full mt-[15px] bg-white rounded-lg shadow-sm  border-gray-100 border-[1px]">
      
      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          
          {/* HEADER */}
          <thead className="bg-gray-50 ">
            <tr className="text-gray-500">
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1">
                  Item
                  <i className="fa-solid fa-sort text-[10px]" />
                </div>
              </th>

              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1">
                  Qty
                  <i className="fa-solid fa-sort text-[10px]" />
                </div>
              </th>

              <th className="px-4 py-3 text-left font-medium">
                <div className="flex items-center gap-1">
                  Selling Price (Disc %)
                  <i className="fa-solid fa-sort text-[10px]" />
                </div>
              </th>

              <th className="px-4 py-3 text-left font-medium">
                Purchase Price
              </th>

              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            <tr className="border-b last:border-none hover:bg-gray-50 transition">
              
              {/* ITEM */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-rose-200 flex items-center justify-center font-semibold text-xs">
                    SP
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      Sample Product
                    </p>
                    <p className="text-xs text-gray-500">
                      Product <span className="text-indigo-600">00000000</span>
                    </p>
                  </div>
                </div>
              </td>

              {/* QTY */}
              <td className="px-4 py-4 bg-red-50 font-semibold">
                0
              </td>

              {/* SELLING PRICE */}
              <td className="px-4 py-4 font-semibold">
                ₹ 100.00
              </td>

              {/* PURCHASE PRICE */}
              <td className="px-4 py-4">
                ₹ 0.00
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                    <i className="fa-solid fa-bars text-xs" />
                  </button>

                  <button className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 text-xs font-medium">
                    ✎ Edit
                  </button>

                  <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                    <i className="fa-solid fa-ellipsis-vertical text-xs" />
                  </button>
                </div>
              </td>

            </tr>
          </tbody>

        </table>
      </div>
    </div>
         

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
