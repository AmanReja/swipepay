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
          <div className="overflow-hidden rounded-[5px] mt-[20px]" >
          <table className="w-full  bg-gray-50 text-[14px] ">
          <thead className="bg-gray-100 h-[30px] text-gray-700 font-semibold">
  <tr>
    <td className="p-2">Amount</td>
    <td className="p-2">Status</td>
    <td className="p-2">Invoice#</td>
    <td className="p-2">Ack No.</td>
    <td className="p-2">Customer</td>
    <td className="p-2">Date/Created Time</td>
    <td className="p-2">Actions</td>
  </tr>
</thead>

<tbody className="bg-white">
  {invoiceRows.map((row, i) => (
    <tr key={i} className=" hover:bg-gray-50 transition">
      <td className="p-2">{row.amount}</td>
      <td className="p-2">
  <span
    className={`
      px-3 py-[4px] text-[12px] rounded-full font-medium
      ${
        row.status === "SUCCESS"
          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
        : row.status === "PENDING"
          ? "bg-amber-100 text-amber-700 border border-amber-200"
        : row.status === "FAILED"
          ? "bg-rose-100 text-rose-700 border border-rose-200"
        : row.status === "CANCELLED"
          ? "bg-gray-200 text-gray-700 border border-gray-300"
          : "bg-gray-100 text-gray-600 border border-gray-200"
      }
    `}
  >
    {row.status}
  </span>
</td>

      <td className="p-2">{row.invoice}</td>
      <td className="p-2">{row.ack}</td>
      <td className="p-2">{row.customer}</td>
      <td className="p-2">{row.date}</td>
      <td className="p-2">{row.actions}</td>
    </tr>
  ))}
</tbody>

          </table>
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
