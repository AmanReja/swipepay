import React, { useState, useEffect,useRef, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";
import Offers from "./Offers";
import webinar from "../assets/images/webinar.svg";
import { toast, Toaster } from "sonner";
import {ChevronDown,Plus} from "lucide-react";
import {get_customer,addcustomer} from "../redux/action";
import { useDispatch,useSelector } from "react-redux";
import { Company } from "../Contexts/Company";


const Customer = ({ theme }) => {



 
  const dispatch = useDispatch();
  const customerdata = useSelector((state)=>state.customers.customers?.customers);
  console.log(16,customerdata);

  
  const { company } = useContext(Company);



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
  
    tds: "0",
    tds_data: null,
  
    tcs: "0",
    tcs_data: null,
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
    
      company: form.company,
      corp_id: form.corp_id,
    
      opening_balance: form.opening_balance,
      
      current_balance:
        form.current_balance || form.opening_balance,
    
      balance_type: form.balance_type,
    
      rcm_enabled: form.rcm_enabled ? 1 : 0,
    
      tds: form.tds,                 // "0" | "1"
      tds_data: form.tds === "1" ? form.tds_data : null,
    
      tcs: form.tcs,                 // "0" | "1"
      tcs_data: form.tcs === "1" ? form.tcs_data : null,
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

              
            </motion.div>
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
    <div className="flex mt-6 items-center h-[50px] gap-4">
          <div className="flex items-center border rounded-md hover:ring-2 hover:ring-black duration-100 bg-white shadow-sm w-[500px] h-[30px] px-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              type="text"
              placeholder="Search products, category, description, barcode..."
              className="ml-2 w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="px-4 h-[30px] flex items-center bg-gray-200 rounded-md text-sm font-medium">
            Actions <ChevronDown/>
          </div>
          <div  onClick={handleModel} className="px-4 h-[30px] cursor-pointer flex items-center text-white bg-blue-600 rounded-md text-sm font-medium">
          <Plus size={20} /> New Customer
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
          <thead className="sticky top-0 z-10 bg-gray-50 border-b">
            <tr className="text-left text-gray-500 font-medium">
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">
            {customerdata?.length > 0 ? (
              customerdata.map((cust, index) => (
                <tr key={cust.id} className="group hover:bg-gray-50 transition">
                  {/* Index */}
                  <td className="px-5 py-4 text-gray-400">{index + 1}</td>

                  {/* Name + Avatar */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                        {cust.customer_name?.[0] || "-"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cust.customer_name}</p>
                        <p className="text-xs text-gray-500">ID: {cust.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-gray-700">{cust.phone || "-"}</td>

                  {/* Email */}
                  <td className="px-5 py-4 text-gray-700">{cust.email || "-"}</td>

                  {/* Company */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {cust.corp_id || "-"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700">
                        View
                      </button>
                      <button className="px-3 py-1.5 text-xs rounded-md border hover:bg-gray-100">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  No customers found
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

      <div>
        <label className="text-sm font-medium text-gray-700">Corp ID</label>
        <input
          name="corp_id"
          value={form.corp_id}
          onChange={handleChange}
          placeholder="Corporate ID"
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

      <input
        name="current_balance"
        value={form.current_balance}
        onChange={handleChange}
        placeholder="₹ Current balance"
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
  <label for="tcs" className="flex items-center justify-between gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
  <span className="text-sm font-medium text-gray-700">
    tcs
  </span>

  <div className="relative">
    <input id="tcs"
      type="checkbox"
      checked={form.tcs === 1}
      onChange={(e) =>
        setForm({
          ...form,
          tcs: e.target.checked ? 1 : 0,
        })
      }
      className="sr-only"
    />

    {/* Toggle Track */}
    <div
      className={`w-11 h-6 rounded-full transition ${
        form.tcs === 1 ? "bg-blue-600" : "bg-gray-300"
      }`}
    />

    {/* Toggle Thumb */}
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        form.tcs === 1 ? "translate-x-5" : ""
      }`}
    />
  </div>
</label>
  <label className="flex items-center justify-between gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
  <span className="text-sm font-medium text-gray-700">
    tds
  </span>

  <div className="relative">
    <input
      type="checkbox"
      checked={form.tds === 1}
      onChange={(e) =>
        setForm({
          ...form,
          tds: e.target.checked ? 1 : 0,
        })
      }
      className="sr-only"
    />

    {/* Toggle Track */}
    <div
      className={`w-11 h-6 rounded-full transition ${
        form.tds === 1 ? "bg-blue-600" : "bg-gray-300"
      }`}
    />

    {/* Toggle Thumb */}
    <div
      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        form.tds === 1 ? "translate-x-5" : ""
      }`}
    />
  </div>
</label>
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

export default Customer;
