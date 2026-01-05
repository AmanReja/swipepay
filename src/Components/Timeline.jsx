import React, { useState, useEffect,useRef, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";
import Offers from "./Offers";
import webinar from "../assets/images/webinar.svg";
import { toast, Toaster } from "sonner";
import {ChevronDown,Plus} from "lucide-react";
import {get_customer,addcustomer,getpayments,getinventorytimeline} from "../redux/action";
import { useDispatch,useSelector } from "react-redux";
import { Company } from "../Contexts/Company";


const Timeline = ({ theme }) => {



 
  const dispatch = useDispatch();
//   const customerdata = useSelector((state)=>state.customers.customers?.customers);
  const paymentsdata = useSelector((state)=>state.payments.payments);
  console.log(21,paymentsdata);

  
  const { company } = useContext(Company);
  const [istdsactive,setIstdsactive]=useState(false)
  const [showTdsDropdown, setShowTdsDropdown] = useState(false);
const [selectedTds, setSelectedTds] = useState("");




  const [istcsactive,setIstcsactive]=useState(false)
  const [showTcsDropdown, setShowTcsDropdown] = useState(false);
const [selectedTcs, setSelectedTcs] = useState("");


  useEffect(() => {
    
  if (istcsactive) {
    setSelectedTds("")
  } 

  if (istdsactive) {
    setSelectedTcs("")
  }


  
  }, [istcsactive,istdsactive])
  



  



  const tcsvalues = [
    { code: "206C", rate: "1%", label: "Liquor of alcoholic nature, made for human consumption" },
    { code: "206C", rate: "2%", label: "Timber wood obtained under a forest lease" },
    { code: "206C", rate: "5%", label: "Tendu leaves" },
    { code: "206C", rate: "2%", label: "Timber wood obtained by any mode other than forest lease" },
    { code: "206C", rate: "2.5%", label: "Forest produce other than Tendu leaves and timber" },
    { code: "206C", rate: "1%", label: "Scrap" },
    { code: "206C", rate: "1%", label: "Minerals like lignite, coal and iron ore" },
    { code: "206C", rate: "1%", label: "Purchase of motor vehicle exceeding ₹10 Lakhs" },
  ];
  const tdsvalues = [
    {
      code: "192A",
      rate: "10%",
      label: "EPF premature withdrawal",
    },
    {
      code: "193",
      rate: "10%",
      label: "Interest on securities",
    },
    {
      code: "194",
      rate: "10%",
      label: "Dividends",
    },
    {
      code: "194A",
      rate: "10%",
      label: "Interest (Banks)",
    },
    {
      code: "194A",
      rate: "10%",
      label: "Interest (Senior Citizens)",
    },
    {
      code: "194C",
      rate: "1%",
      label: "Single contractor payment (Individual & HUF)",
    },
    {
      code: "194C",
      rate: "1%",
      label: "Aggregate contractor payment (Individual & HUF)",
    },
    {
      code: "194D",
      rate: "5%",
      label: "Insurance commission",
    },
  ];
  

  const timelinedata = useSelector((state)=>state.timeline.timeline?.timeline
  );
  console.log("time",timelinedata);
  


  useEffect(() => {
    if (company?.companyName) {
      dispatch(get_customer(company.companyName));
    }
   dispatch(getpayments(company.companyName))

   dispatch(getinventorytimeline(company.companyName))


  }, [company, dispatch]);

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

  const tabs = ["Success", "Cancelled"];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);






  
  

  const [form, setForm] = useState({

  
    customer_name: "",
    phone: "",
    email: "",
    gst: "",
  
    company: "",
    corp_id: "",
  
    opening_balance: "",
    current_balance: "",
    balance_type: "",
  
    rcm_enabled: 0,
  
 
    
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  useEffect(() => {
    const current = tabRefs.current[activeIndex];
    if (current) {
      setIndicatorStyle({
        width: current.offsetWidth,
        left: current.offsetLeft,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const shouldShow = localStorage.getItem("showLoginToast");
    if (shouldShow === "true") {
      toast.success("🚀 Login success!", { duration: 2500 });
      localStorage.removeItem("showLoginToast");
    }
  }, []);


  const handelsubmit =(e)=>{
    e.preventDefault()
    const payload = {
  
    
      customer_name: form.customer_name,
      phone: form.phone,
      email: form.email,
      gst: form.gst,
    
      companyName: form.company,
     
    
      opening_balance: form.opening_balance,
      
     
    
      balance_type: form.balance_type,
    
      rcm_enabled: form.rcm_enabled ? 1 : 0,
    
      tds: istdsactive,                 // "0" | "1"
      tds_data:selectedTds,
    
      tcs: istcsactive,                 // "0" | "1"
      tcs_data: selectedTcs
    };


 


    dispatch(addcustomer(payload,company.companyName))
    
  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className={`flex ${isModelOpen ? "p-4" : ""} duration-300 flex-col gap-[20px] h-auto py-[10px]`}
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
            <motion.div variants={fade} className="flex items-center justify-between ">
              <div className="flex items-center gap-[2px]">
                <h1 className="text-[24px] font-bold">Inventory Timeline</h1>
              
              </div>

              
            </motion.div>
            <div className=" pb-2 relative">
    
    </div>
    <div className="flex mt-6 items-center h-[50px] gap-4">
          <div className="flex items-center border rounded-md hover:ring-2 hover:ring-black duration-100 bg-white shadow-sm w-[500px] h-[30px] px-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              type="text"
              placeholder="Search products, category, description, barcode..."
              className="ml-2 w-full text-sm outline-none bg-transparent"
            />
          </div>

    
         
        </div>
        <div className="mt-6 overflow-x-auto">
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  <div className="overflow-x-auto">
  <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <table className="min-w-full text-sm">
          {/* HEADER */}
          <thead className="bg-gray-50">
  <tr className="text-left text-gray-500 font-medium text-[12px]">
    <th className="px-4 py-3">Item</th>
    <th className="px-4 py-3">Stock In</th>
    <th className="px-4 py-3">Stock Out</th>
    <th className="px-4 py-3">Source</th>
    <th className="px-4 py-3">Category</th>
    <th className="px-4 py-3">Remarks</th>
    <th className="px-4 py-3">Date / Updated By</th>
    <th className="px-4 py-3 text-right">Actions</th>
  </tr>
</thead>





          {/* BODY */}
          <tbody className="">
  {timelinedata?.length > 0 ? (
    timelinedata.map((row, index) => (
      <tr key={index} className="hover:bg-gray-50">
        {/* Item */}
        <td className="px-4 py-3 font-medium text-gray-900">
          {row.item}
        </td>

        {/* Stock In */}
        <td className="px-4 py-3 bg-green-50 text-green-700 font-semibold">
          {row.stock_in || ""}
        </td>

        {/* Stock Out */}
        <td className="px-4 py-3 bg-red-50 text-red-600 font-semibold">
          {row.stock_out || ""}
        </td>

        {/* Source */}
        <td className="px-4 py-3 text-indigo-700 text-xs font-medium capitalize">
          {row.source}
        </td>

        {/* Category */}
        <td className="px-4 py-3 text-gray-700">
          {row.category || ""}
        </td>

        {/* Remarks */}
        <td className="px-4 py-3 text-gray-700">
          {row.remarks}
        </td>

        {/* Date / Updated By */}
        <td className="px-4 py-3">
          <p className="text-gray-800">
            {new Date(row.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-400">by</p>
        </td>

        {/* Actions */}
        <td className="px-4 py-3 text-right">
          <div className="flex justify-end gap-2">
            <button className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-xs text-yellow-700 hover:bg-yellow-200">
            <i class="fa-regular fa-pen-to-square"></i> Edit
            
            </button>
            <button className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200">
            <i class="fa fa-sm fa-trash "></i> 
            </button>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="px-6 py-10 text-center text-gray-400">
        No Data
      </td>
    </tr>
  )}
</tbody>


        </table>
      </motion.div>
    </AnimatePresence>
  </div>
</div>

</div>

        
            {/* Background Overlay */}
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
        <h2 className="text-lg font-semibold">Customer Settings</h2>
        <button onClick={handleModel}>✕</button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 text-sm">
      <form className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 space-y-8">
  
  {/* BASIC DETAILS */}
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-gray-800 border-b pb-2">
      Basic Details
    </h2>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Name <span className="text-red-500">*</span>
      </label>
      <input
        name="customer_name"
        value={form.customer_name}
        onChange={handleChange}
        placeholder="Enter customer name"
        className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    <div className="grid grid-cols-2 gap-5">
      <div>
        <label className="text-sm font-medium text-gray-700">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 9876543210"
          className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="name@example.com"
          className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
    </div>
  </div>

  {/* COMPANY DETAILS */}
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-gray-800 border-b pb-2">
      Company Details
    </h2>

    <div>
      <label className="text-sm font-medium text-gray-700">GSTIN</label>
      <input
        name="gst"
        value={form.gst}
        onChange={handleChange}
        placeholder="29ABCDE1234F1Z5"
        className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    <div className="grid grid-cols-2 gap-5">
      <div>
        <label className="text-sm font-medium text-gray-700">Company Name</label>
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

    </div>
  </div>

  {/* OPENING BALANCE */}
  <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
    <h3 className="font-semibold text-sm text-gray-800">
      Opening Balance
    </h3>

    <div className="flex gap-8">
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="radio"
          name="balance_type"
          value="debit"
          checked={form.balance_type === "debit"}
          onChange={handleChange}
          className="accent-blue-600"
        />
        Debit
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="radio"
          name="balance_type"
          value="credit"
          checked={form.balance_type === "credit"}
          onChange={handleChange}
          className="accent-blue-600"
        />
        Credit
      </label>
    </div>

    <div className="grid grid-cols-2 gap-5">
      <input
        name="opening_balance"
        value={form.opening_balance}
        onChange={handleChange}
        placeholder="₹ Opening balance"
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />

    
    </div>

    <p className="text-xs text-gray-500">
      {form.balance_type === "debit"
        ? "Customer owes you money"
        : "You owe customer money"}
    </p>
  </div>

  {/* TAX & RCM */}
  <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
  <label
  htmlFor="tcs"
  className="flex items-center justify-between gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
>
  <span className="text-sm font-medium text-gray-700">TCS</span>

  <div className="relative">
    <input
      id="tcs"
      type="checkbox"
      checked={istcsactive === true}
      onChange={(e) => {
        if (e.target.checked) {
          setIstcsactive(true);
          setIstdsactive(false); // ❌ disable TDS
        } else {
          setIstcsactive(false);
        }
      }}
      className="sr-only"
    />

    {/* Track */}
    <div
      className={`w-11 h-6 rounded-full transition ${
        istcsactive === true ? "bg-blue-600" : "bg-gray-300"
      }`}
    />

    {/* Thumb */}
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        istcsactive === true ? "translate-x-5" : ""
      }`}
    />
  </div>
</label>

{istcsactive === true && (
  <div className="relative w-full mt-3">

    {/* Input Box */}
    <div
      onClick={() => setShowTcsDropdown(!showTcsDropdown)}
      className="
        flex justify-between items-center
        px-4 py-2
        text-sm text-gray-700
        bg-white
        border border-gray-300
        rounded-lg
        shadow-sm
        cursor-pointer
        focus:border-blue-500
      "
    >
      <input
        readOnly
        value={selectedTcs}
        placeholder="Select TCS type"
        className="outline-none w-[90%] cursor-pointer"
      />
      <ChevronDown size={16} />
    </div>

    {/* Dropdown List */}
    {showTcsDropdown && (
      <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
        {Object.entries(tcsvalues).map(([key, item]) => (
          <div
            key={key}
            onClick={() => {
              setSelectedTcs(`${item.rate} - ${item.label}`);
              setShowTcsDropdown(false);
            }}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            <span className="font-medium">{item.rate}</span>{" "}
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    )}

  </div>
)}


<label
  className="flex items-center justify-between gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
>
  <span className="text-sm font-medium text-gray-700">TDS</span>

  <div className="relative">
    <input
      type="checkbox"
      checked={istdsactive === true}
      onChange={(e) => {
        if (e.target.checked) {
          setIstdsactive(true);
          setIstcsactive(false); // ❌ disable TCS
        } else {
          setIstdsactive(false);
        }
      }}
      className="sr-only"
    />

    {/* Track */}
    <div
      className={`w-11 h-6 rounded-full transition ${
        istdsactive === true ? "bg-blue-600" : "bg-gray-300"
      }`}
    />

    {/* Thumb */}
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        istdsactive === true ? "translate-x-5" : ""
      }`}
    />
  </div>
</label>
{istdsactive === true && (
  <div className="relative w-full mt-3">

    {/* Input Box */}
    <div
      onClick={() => setShowTdsDropdown(!showTdsDropdown)}
      className="
        flex justify-between items-center
        px-4 py-2
        text-sm text-gray-700
        bg-white
        border border-gray-300
        rounded-lg
        shadow-sm
        cursor-pointer
        focus:border-blue-500
      "
    >
      <input
        readOnly
        value={selectedTds}
        placeholder="Select TDS type"
        className="outline-none w-[90%] cursor-pointer"
      />
      <ChevronDown size={16} />
    </div>

    {/* Dropdown List */}
    {showTdsDropdown && (
      <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
        {tdsvalues.map((item, index) => (
          <div
            key={`${item.code}-${index}`}
            onClick={() => {
              setSelectedTds(`${item.rate} ${item.code} ${item.label}`);
              setShowTdsDropdown(false);

              // Optional: save in form
              // setForm({
              //   ...form,
              //   tds_code: item.code,
              //   tds_rate: item.rate,
              // });
            }}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
          >
            <span className="font-medium">{item.rate}</span>{" "}
            <span className="text-gray-800">{item.code}</span>{" "}
            <span className="text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    )}

  </div>
)}

  <label className="flex items-center justify-between gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
  <span className="text-sm font-medium text-gray-700">
    RCM Enabled
  </span>

  <div className="relative">
    <input
      type="checkbox"
      checked={form.rcm_enabled === 1}
      onChange={(e) =>
        setForm({
          ...form,
          rcm_enabled: e.target.checked ? 1 : 0,
        })
      }
      className="sr-only"
    />

    {/* Toggle Track */}
    <div
      className={`w-11 h-6 rounded-full transition ${
        form.rcm_enabled === 1 ? "bg-blue-600" : "bg-gray-300"
      }`}
    />

    {/* Toggle Thumb */}
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        form.rcm_enabled === 1 ? "translate-x-5" : ""
      }`}
    />
  </div>
</label>

    


  </div>

  {/* ACTIONS */}
  <div className="flex justify-end gap-4 pt-4">
    <button
      type="button"
      onClick={handleModel}
      className="px-5 py-2.5 text-sm rounded-lg border border-gray-300 
                 hover:bg-gray-100 transition"
    >
      Cancel
    </button>

    <button
      type="submit"
      onClick={handelsubmit}
      className="px-6 py-2.5 text-sm rounded-lg bg-blue-600 text-white 
                 hover:bg-blue-700 shadow-md transition"
    >
      Save Customer
    </button>
  </div>
</form>

      </div>

      {/* Footer */}
      <div
        className={`flex justify-end gap-2 p-4 shadow-md flex-none ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
      >
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

                <motion.button onClick={handleModel}
                  variants={fade}
                  className="mt-6 h-[40px] cursor-pointer w-full flex justify-center items-center rounded-[8px] px-6 py-3 bg-blue-600 text-white shadow hover:bg-blue-700 transition"
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

export default Timeline;
