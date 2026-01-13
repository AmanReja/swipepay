import {React,useRef,useEffect,useState, useContext} from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import webinar from "../assets/images/webinar.svg";
import Offers from "./Offers";
import { getwarehouse,updatewarehousestock,deletewarehousestock } from "../redux/action";
import { useDispatch,useSelector } from "react-redux";
import {Company} from "../Contexts/Company";



const Warehouses = ({ theme }) => {
  const {company}=useContext(Company);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isadding, setIsadding] = useState(false);
  const [selectedforstock,setSelectedforstock] =useState(null)
  
  const [currentproductid, setCurrentproductid] = useState("");
  const handleModel = () => setIsModelOpen((v) => !v);



  const [form, setForm] = useState({
    quantity: "",
    recordDate: new Date().toISOString().split("T")[0],
    category: "",
    remarks: "",
    purchasePrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const stockInValue =
  form.quantity > 0 && form.purchasePrice > 0
    ? (Number(form.quantity) * Number(form.purchasePrice)).toFixed(2)
    : 0;

  
  








 const dispatch = useDispatch()
 const warehousedata= useSelector((state=>state.warehouse.warehouse?.items));
 const warehousesummary= useSelector((state=>state.warehouse.warehouse?.summary));
 console.log("war",warehousesummary); 


 const addform = (item) => {
  setSelectedforstock(item)
  setIsadding(true);
  setCurrentproductid(item.id)

  setForm({
    quantity: item.quantity ?? 0,
    record_date: item.last_updated
      ? item.last_updated.split("T")[0]
      : new Date().toISOString().split("T")[0],
    category: item.category ?? "",
    remarks: item.remarks ?? "",
    purchasePrice: item.purchase_price ?? 0,
  });
};
 const removeform = (item) => {
  setSelectedforstock(item)
  setIsadding(false);
  setCurrentproductid(item.id)

  setForm({
    quantity: item.quantity ?? 0,
    record_date: item.last_updated
      ? item.last_updated.split("T")[0]
      : new Date().toISOString().split("T")[0],
    category: item.category ?? "",
    remarks: item.remarks ?? "",
    purchasePrice: item.purchase_price ?? 0,
  });
};

const handeladdstock = ()=>{

  try {
    dispatch(updatewarehousestock(company.companyName,currentproductid,form))
  } catch (error) {
    console.log(error);
    
  } finally{
    setIsadding(false)
    setIsModelOpen(false)
    setForm({ quantity: "",
    record_date: "",
      category: "",
      remarks: "",
      purchasePrice: "",})
  }
   
     
}




const handelremovestock =()=>{
 
  try {
    dispatch(deletewarehousestock(company.companyName,currentproductid,form))
  } catch (error) {
    console.log(error);
    
  } finally{
    // setIsediting(false)
    setIsModelOpen(false)
    setForm({ quantity: "",
    record_date: "",
      category: "",
      remarks: "",
      purchasePrice: "",})
  }
}







 useEffect(() => {
  dispatch(getwarehouse(company.companyName))


}, [dispatch,company])

 


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
      className="flex flex-col gap-6 h-auto py-4"
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
    value: `${warehousesummary?.negative_stock
      ?.items} Items (${warehousesummary?.negative_stock?.qty})`,
      color: "from-pink-400/10 to-pink-500/20",
    },
    {
      label: "Positive Stock",
      value: `${warehousesummary?.positive_stock
        ?.items} Items (${warehousesummary?.positive_stock?.qty})`,
      color: "from-green-400/10 to-green-500/20",
    },
    {
      label: "Stock Value Sales Price",
      value:`${warehousesummary?.stock_value
        .sale_price}`,
      color: "from-sky-400/10 to-sky-500/20",
      wide: true,
    },
    {
      label: "Stock Value With Purchase",
      value: `${warehousesummary?.stock_value
        .purchase_price
      }`,
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
        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 shadow-sm bg-white">
  <table className="w-full text-sm">
    
    {/* HEADER */}
    <thead className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
      <tr className="h-[52px]">
        <th className="px-5 text-left font-semibold">Item</th>
        <th className="px-5 text-center font-semibold">Qty</th>
        <th className="px-5 text-right font-semibold">Purchase</th>
        <th className="px-5 text-right font-semibold">Sale</th>
        <th className="px-5 text-center font-semibold">Last Updated</th>
        <th className="px-5 text-center font-semibold">Actions</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody className="divide-y divide-gray-100">
      {warehousedata?.map((item, index) => (
        <tr
          key={item.id}
          className={`transition ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          } hover:bg-indigo-50/40`}
        >
          {/* Item */}
          <td className="px-5 py-4 font-medium text-gray-900">
            {item.name}
          </td>

          {/* Quantity */}
          <td className="px-5 py-4 text-center">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
              {item.quantity}
            </span>
          </td>

          {/* Purchase */}
          <td className="px-5 py-4 text-right text-gray-700">
            ₹{Number(item.purchase_price).toFixed(2)}
          </td>

          {/* Sale */}
          <td className="px-5 py-4 text-right font-medium text-emerald-600">
            ₹{Number(item.selling_price).toFixed(2)}
          </td>

          {/* Date */}
          <td className="px-5 py-4 text-center text-gray-600 text-xs">
            {new Date(item.last_updated).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </td>

          {/* Actions */}
          <td className="px-5 py-4">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  handleModel();
                  addform(item);
                }}
                className="px-3 h-[32px] rounded-lg bg-emerald-100 text-emerald-700 text-xs font-medium hover:bg-emerald-200 transition"
              >
                + Stock In
              </button>

              <button
                onClick={() => {
                  handleModel();
                  removeform(item);
                }}
                className="px-3 h-[32px] rounded-lg bg-rose-100 text-rose-700 text-xs font-medium hover:bg-rose-200 transition"
              >
                − Stock Out
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


{isModelOpen &&
            
            <div onClick={handleModel} className="fixed inset-0 bg-black/70 z-40"></div>}

            {/* Settings Panel */}
            <div
      className={`fixed ${isModelOpen ? "right-0" : "right-[-650px]"} duration-300 transition-all top-0 h-full w-[650px] ${
        theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      } z-50 shadow-xl flex flex-col`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-4 pb-3 shadow-md flex-none ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold">{selectedforstock?.name}</h2>
        <button onClick={()=>{handleModel(),setIsadding(false)}}>✕</button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 text-sm">
      <form className="bg-white rounded-xl shadow p-6 space-y-6">
  {/* Quantity info */}
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col gap-1">
      <label>
        Quantity <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        className={`p-2 rounded border ${
          form.quantity < 0 ? "border-red-500" : "border-gray-300"
        }`}
      />
      {form.quantity < 0 && (
        <p className="text-xs text-red-500">
          Quantity cannot be negative
        </p>
      )}
    </div>

    <div className="flex flex-col gap-1">
      <label>Record Date</label>
      <input
        type="date"
        name="recordDate"
        value={form.record_date}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300"
      />
    </div>
  </div>

  {/* Category */}
  <div className="flex flex-col gap-1">
    <label>Select Category</label>
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      className="p-2 rounded border border-gray-300"
    >
      <option value="">Select category or type your own</option>
      <option value="new">New</option>
      <option value="return">Return</option>
      <option value="miscellaneous">Miscellaneous</option>
    </select>
  </div>

  {/* Remarks */}
  <div className="flex flex-col gap-1">
    <label>Remarks</label>
    <textarea
      name="remarks"
      value={form.remarks}
      onChange={handleChange}
      rows={3}
      className="p-2 rounded border border-gray-300"
    />
  </div>

  {/* Price */}
  <div className="grid grid-cols-2 gap-6">
    <div className="flex flex-col gap-1">
      <label>Purchase Price</label>
      <input
        type="number"
        name="purchasePrice"
        value={form.purchasePrice}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label>Stock In Value</label>
      <input
        type="number"
       
        value={form.stockInValue}
        onChange={handleChange}
        className="p-2 rounded border bg-gray-100"
      />
    </div>
  </div>
</form>


      </div>

      {/* Footer */}
      <div
        className={`flex justify-end gap-2 p-4 shadow-md flex-none ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
        <button onClick={()=>{handleModel(),setIsadding(false)}} className="px-4 py-2 bg-gray-200 rounded-md">
          Close
        </button>
        <button onClick={()=>{isadding?handeladdstock():handelremovestock()}} className={`px-4 py-2 ${isadding?"bg-green-600":"bg-red-600"}  text-white rounded-md`}>{isadding?"Add Stock":"Remove Stock"}</button>
      </div>
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
