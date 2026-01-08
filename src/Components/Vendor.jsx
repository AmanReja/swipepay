import React, { useState, useEffect,useRef, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";
import Offers from "./Offers";
import webinar from "../assets/images/webinar.svg";
import { toast, Toaster } from "sonner";
import {ChevronDown,Plus} from "lucide-react";
import {get_customer,addcustomer,addmerchant, getmerchant} from "../redux/action";
import { useDispatch,useSelector } from "react-redux";
import { Company } from "../Contexts/Company";


const Vendor = ({ theme }) => {



 
  const dispatch = useDispatch();
  const customerdata = useSelector((state)=>state.customers.customers?.customers);
  const vendor = useSelector((state)=>state.merchant.merchant);
  console.log(20,vendor);

  const [cxpopup, setCxpopup] = useState(false);
  const [selectedcx, setSelectedcx] = useState(null);
  const [cxdropdown, setCxdropdown] = useState(false);
  const [iscxvendor,setIscxvendor] = useState(false);

 const handelcxpopup =()=>{
  setCxpopup((prev)=>!prev)
 }


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
  
   useEffect(()=>{
    if (company?.companyName) {
      
    }
    dispatch(getmerchant(company.companyName))
   },[dispatch])



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
  
  
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  useEffect(() => {
    if (company?.companyName) {
      dispatch(get_customer(company.companyName));
    }
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

  const tabs = ["All Customers", "Groups", "Deleted"];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);
  const [isboth,setIsboth]=useState(false)






  
  

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
  
    
      vendor_name: form.customer_name,
      phone: form.phone,
      email: form.email,
      gstin: form.gst,
    
      company_name: form.company,
     
    
      opening_balance: form.opening_balance,
      
     
    
      balance_type: form.balance_type,
    
      rcm_enabled: form.rcm_enabled ? 1 : 0,
    
      tds: istdsactive,                 // "0" | "1"
      tds_data:selectedTds,
    
      tcs: istcsactive,                 // "0" | "1"
      tcs_data: selectedTcs
    };
   

      

 


    dispatch(addmerchant(payload,company.companyName,selectedcx?.id))
    
  }


  const createvendorand_customer =(e)=>{
    e.preventDefault()
    try {
      const vendor = {
  
    
        vendor_name: form.customer_name,
        phone: form.phone,
        email: form.email,
        gstin: form.gst,
      
        company_name: form.company,
       
      
        opening_balance: form.opening_balance,
        
       
      
        balance_type: form.balance_type,
      
        rcm_enabled: form.rcm_enabled ? 1 : 0,
      
        tds: istdsactive,                 // "0" | "1"
        tds_data:selectedTds,
      
        tcs: istcsactive,                 // "0" | "1"
        tcs_data: selectedTcs
      };
  
      dispatch(addmerchant(vendor,company.companyName))
  
  
      const customer = {
    
      
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
  
  
      dispatch(addcustomer(customer,company.companyName))
    } catch (error) {
      console.log(error);
    } finally{
      setIsboth(false)
    }
 

  }

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className={`flex ${isModelOpen ? "p-4" : ""} duration-300 flex-col gap-[20px] overflow-y-auto h-auto py-[10px]`}
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
                <h1 className="text-[26px] font-bold">Vendors</h1>
                <div className="flex bg-pink-500 h-[22px] rounded-full w-[22px] justify-center items-center">
            <i className="fa-solid text-white text-[12px] fa-play"></i>
          </div>
              </div>

              
            </motion.div>
            <table className="min-w-[900px] w-full text-sm">
          
          {/* HEADER */}
          <thead className="bg-gray-50">
  <tr className="text-gray-500">
    <th className="px-4 py-3 text-left font-medium">
      <div className="flex items-center gap-1">
        Vendor
        <i className="fa-solid fa-sort text-[10px]" />
      </div>
    </th>

  

    <th className="px-4 py-3 text-left font-medium">
      <div className="flex items-center gap-1">
        Opening Balance
        <i className="fa-solid fa-sort text-[10px]" />
      </div>
    </th>

    <th className="px-4 py-3 text-left font-medium">
      Balance Type
    </th>

    <th className="px-4 py-3">Action</th>
  </tr>
</thead>


          {/* BODY */}
          <tbody>
  {vendor?.map((vendor, i) => (
    <tr
      key={vendor.vendor_id}
      className="last:border-none hover:bg-gray-50 transition"
    >
      {/* ITEM */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-rose-200 flex items-center justify-center font-semibold text-xs">
            {getInitials(vendor.vendor_name)}
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {vendor.vendor_name}
            </p>
            <p className="text-xs text-gray-500">
              {vendor.company_name} •{" "}
              <span className="text-indigo-600">{vendor.gstin}</span>
            </p>
          </div>
        </div>
      </td>

      {/* QTY */}
     

      {/* SELLING PRICE */}
      <td className="px-4 py-4 font-semibold">
        ₹ {Number(vendor.opening_balance).toFixed(2)}
      </td>

      {/* PURCHASE PRICE */}
      <td className="px-4 py-4">
  <span
    className={`font-semibold text-[10px] ${
      vendor.balance_type === "credit"
        ? "text-green-800 bg-green-200 p-2 rounded-[5px] "
        : vendor.balance_type === "debit"
        ? "text-red-800 bg-red-200 p-2 rounded-[5px]"
        : ""
    }`}
  >
    {vendor.balance_type?.toUpperCase()}
  </span>
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
  ))}
</tbody>


        </table>
     
  


        
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
  <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
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
  <div className="flex w-full bg-white justify-between">
    <button onClick={()=>{setIsboth(true)}} type="button" className="flex p-2 bg-blue-500 text-white rounded-[4px]">Create customer with same details</button>
    <button onClick={handelcxpopup} type="button" className="flex p-2 bg-violet-500 text-white rounded-[4px]">Customer Linking</button>
  
  </div>
  {cxpopup&&<div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      {/* <div
        className="absolute inset-0 bg-black/40"
        onClick={handelcxpopup}
      /> */}

      {/* MODAL */}
      <div className="relative bg-white w-[360px] rounded-lg shadow-lg p-5 z-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">Add Customer</h2>
          <button
            onClick={()=>{handelcxpopup(),setCxdropdown(false)}}
            className="text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* INPUT */}
        <input
         onClick={()=>{setCxdropdown(true)}}
          type="text"
          placeholder="Enter customer name"
          // onClick={()=>{setCxdropdown(true)}
          value={selectedcx?.customer_name}
          // onChange={(e) => s(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {cxdropdown &&
  customerdata.map((cx) => (
    <div
      className="cursor-pointer px-3 py-2 text-sm 
                 hover:bg-blue-50 hover:text-blue-600 
                 transition-all duration-150
                 
                 flex items-center gap-2"
      onClick={(e) => {
        setSelectedcx(cx);
        console.log(698, selectedcx);
      }}
    >
      <div className="w-7 h-7 rounded-full bg-blue-100 
                      text-blue-700 font-semibold text-xs 
                      flex items-center justify-center">
        {cx.customer_name?.charAt(0)}
      </div>

      <span className="font-medium">
        {cx.customer_name}
      </span>
    </div>
  ))}

       

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handelcxpopup}
            className="px-4 py-1.5 text-sm rounded-md border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={()=>{setCxpopup(false),setForm({...form,customer_name:selectedcx?.customer_name})}}
            type="button"
            className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>}
  

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
      onClick={isboth?createvendorand_customer:handelsubmit}
      className="px-6 py-2.5 text-sm rounded-lg bg-blue-600 text-white 
                 hover:bg-blue-700 shadow-md transition"
    >
      Save Vendor
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
                <h2 className="text-3xl font-semibold leading-tight mb-4">All your vendors in one place.</h2>

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

export default Vendor;
