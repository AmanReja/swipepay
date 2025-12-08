import {React,useRef,useEffect,useState} from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import webinar from "../assets/images/webinar.svg";
import Offers from "./Offers";

const Warehouses = ({ theme }) => {
  const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
  };

  const stagger = {
    show: { transition: { staggerChildren: 0.15 } },
  };
  const tabs = ["Item", "Qty", "Purchase Price", "Sale Price", "Last Updated", "Actions"];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);

  useEffect(() => {
    const current = tabRefs.current[activeIndex];
    if (current) {
      setIndicatorStyle({
        width: current.offsetWidth,
        left: current.offsetLeft,
      });
    }
  }, [activeIndex]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="flex flex-col gap-6 overflow-y-auto max-h-[500px] py-4"
    >
      {/* ------------------------------------------------ Banner ------------------------------------------------ */}
    <Offers></Offers>

      {/* ------------------------------------------------ Main Section ------------------------------------------------ */}
      <motion.div
        variants={fade}
        className={`rounded-xl shadow-sm p-6 ${
          theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        {/* ---------------- Header ---------------- */}
        <motion.div variants={fade} className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
            Products & Services <span className="text-pink-500 text-xl">▶</span>
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-medium"
          >
            Connecting to E-Invoicing Portal
          </motion.button>
        </motion.div>

        {/* ---------------- Tabs ---------------- */}
        <div className=" pb-2 relative">
      <ul className="flex gap-10 text-gray-500 font-medium text-sm relative">
        {tabs.map((tab, i) => (
          <li
            key={i}
            ref={(el) => (tabRefs.current[i] = el)}
            className={`cursor-pointer pb-2 ${
              activeIndex === i ? "text-blue-400" : ""
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {tab}
          </li>
        ))}

        {/* Sliding Indicator */}
        <div
          className="absolute bottom-0 h-[2px] bg-blue-400 transition-all duration-300"
          style={indicatorStyle}
        ></div>
      </ul>
    </div>

        {/* ---------------- Stats Cards ---------------- */}
        <div className="flex flex-wrap mt-4 gap-4">
  {[
    {
      label: "Low Stock",
      value: "1 Items (0 Qty)",
      color: "from-pink-400/10 to-pink-500/20",
    },
    {
      label: "Positive Stock",
      value: "1 Items (0 Qty)",
      color: "from-green-400/10 to-green-500/20",
    },
    {
      label: "Stock Value Sales Price",
      value: "₹ 0",
      color: "from-sky-400/10 to-sky-500/20",
      wide: true,
    },
    {
      label: "Stock Value With Purchase",
      value: "₹ 0",
      color: "from-amber-400/10 to-amber-500/20",
      wide: true,
    },
  ].map((item, index) => (
    <div
      key={index}
      className={`
        bg-gradient-to-br ${item.color}
        p-5 rounded-2xl shadow-md border border-white/60 backdrop-blur-lg
        transition-all duration-300 hover:shadow-xl hover:scale-[1.03]
        ${item.wide ? "w-[260px]" : "w-[210px]"}
      `}
    >
      <p className="text-[13px] font-semibold text-gray-600 tracking-wide">
        {item.label}
      </p>

      <p className="text-[22px] font-extrabold text-gray-800 mt-1">
        {item.value}
      </p>

      {/* Subtle detail line */}
      
    </div>
  ))}
</div>


        {/* ---------------- Search ---------------- */}
        <div className="flex mt-6 gap-4">
          <div className="flex items-center border rounded-md hover:ring-2 hover:ring-black duration-100 bg-white shadow-sm w-[500px] h-[40px] px-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              type="text"
              placeholder="Search products, category, description, barcode..."
              className="ml-2 w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="px-4 flex items-center bg-gray-200 rounded-md text-sm font-medium">
            Select Category
          </div>
        </div>

        {/* ---------------- Table ---------------- */}
        <div className="overflow-hidden mt-8 rounded-2xl shadow-lg border border-gray-200">
  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-100 h-[50px] text-gray-700 font-semibold">
      <tr>
        <td className="p-3 rounded-tl-2xl">Item</td>
        <td className="p-3">Qty</td>
        <td className="p-3">Purchase Price</td>
        <td className="p-3">Sale Price</td>
        <td className="p-3">Last Updated</td>
        <td className="p-3 rounded-tr-2xl">Actions</td>
      </tr>
    </thead>

    <tbody>
      <tr className="bg-white hover:bg-gray-50 transition">
        <td className="p-4 rounded-bl-2xl text-gray-800">Sample Product</td>
        <td className="p-4 text-gray-700">0</td>
        <td className="p-4 text-gray-700">₹0.00</td>
        <td className="p-4 text-gray-700">₹100.00</td>
        <td className="p-4 text-gray-600">27 Nov 25, 10:36</td>

        <td className="p-4 rounded-br-2xl flex flex-col gap-2">
          <button className="bg-emerald-100 text-emerald-700 h-[32px] rounded-lg font-medium text-xs hover:bg-emerald-200 transition">
            Stock In
          </button>

          <button className="bg-rose-100 text-rose-700 h-[32px] rounded-lg font-medium text-xs hover:bg-rose-200 transition">
            Stock Out
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>


        {/* ---------------- Feature Section ---------------- */}
        <motion.div
          variants={stagger}
          className={`flex flex-col lg:flex-row items-center mt-10 p-6 gap-8 rounded-xl ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <motion.div variants={fade} className="w-full lg:w-1/2 flex justify-center">
            <img src={webinar} className="w-[70%] max-w-[350px] object-contain" />
          </motion.div>

          <motion.div variants={fade} className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              Organize and streamline all your products.
            </h2>

            <motion.ul variants={stagger} className="flex flex-col gap-3">
              {[
                "Bulk upload products in a click",
                "Keep multiple price lists",
                "Create batches and group products easily",
              ].map((text, i) => (
                <motion.li key={i} variants={fade} className="flex items-center gap-2 text-[15px]">
                  <FaCheckCircle className="text-gray-600" />
                  {text}
                </motion.li>
              ))}
            </motion.ul>

            <motion.button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg shadow font-medium hover:bg-blue-700">
              + Add your Products
            </motion.button>

            {/* Footer links */}
            <div className="mt-6 flex flex-col gap-3 text-sm">
              <div className="cursor-pointer flex gap-2 items-center">
                🎧 <span className="hover:underline">Talk to a specialist</span>
              </div>

              <div className="cursor-pointer flex gap-2 items-center">
                📺 <span className="hover:underline">Watch how it works</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- Bottom Banner ---------------- */}
        <div className="mt-6 bg-blue-100 p-4 rounded-xl flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm">Batch & Expiry</h3>
            <p className="text-[13px] mt-1">
              Manage and organize products in batches for seamless inventory management.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-700 font-semibold rounded hover:bg-gray-200">
              Talk to a specialist
            </button>

            <button className="px-5 py-2 bg-yellow-300 rounded-lg font-bold text-sm">
              Upgrade
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Warehouses;
