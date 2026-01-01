import React, { useState, useEffect, useRef, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Offers from "./Offers";
import webinar from "../assets/images/webinar.svg";
import { toast, Toaster } from "sonner";
import { ChevronDown, Plus } from "lucide-react";
import { addexpense, addbank, getexpense, getexpcategory,getbank } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Company } from "../Contexts/Company";
import { DatePicker } from 'rsuite';


const Expenses = ({ theme }) => {

  const [ispaid, setIspaied] = useState(false);
  const [bankopen, setBankopen] = useState(false);
  const [bankbtn, setBankbtn] = useState(false);
  const [openbankdr, setOpenbankdr] = useState(false);
  const [selectedbank, setSelectedbank] = useState(null);


  const [ opencategory,setOpenCategory] = useState(false);
  const[selectedcategory,setSelectedcategory] = useState(null)


  const [bankForm, setBankForm] = useState({
    account_holder_name: "",
    account_no: "",
    confirm_account_no: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    upi_id: "",
    upi_number: "",
    opening_balance: "",
    notes: "",
    is_default: false,
  });
  
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankForm({ ...bankForm, [name]: value });
  };
  
  const handleToggle = () => {
    setBankForm({ ...bankForm, is_default: !bankForm.is_default });
  };
  






  const expcadata = useSelector((state)=>state.expcategory.expcategory?.data);

  console.log(28,expcadata);


  const dispatch = useDispatch();
  const customerdata = useSelector((state) => state.customers.customers?.customers);
  console.log(16, customerdata);
  const expensedata = useSelector((state) => state.expense.expense?.data);
  console.log(65, expensedata);
  const banksdata = useSelector((state) => state.bank.bank?.data);
  console.log(67, banksdata);


  const { company } = useContext(Company);
  const [istdsactive, setIstdsactive] = useState(false)
  const [showTdsDropdown, setShowTdsDropdown] = useState(false);
  const [selectedTds, setSelectedTds] = useState("");



  const handelbanksubmit =()=>{
    console.log(51,bankForm);
    dispatch(addbank(bankForm,company.companyName))
  }


  useEffect(() => {
    dispatch(getbank(company.companyName))
  
   
  }, [dispatch])
  


  const [istcsactive, setIstcsactive] = useState(false)
  const [showTcsDropdown, setShowTcsDropdown] = useState(false);
  const [selectedTcs, setSelectedTcs] = useState("");
  const [paymentType, setPaymentType] = useState("");


  useEffect(() => {

    if (istcsactive) {
      setSelectedTds("")
    }

    if (istdsactive) {
      setSelectedTcs("")
    }



  }, [istcsactive, istdsactive])





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
  const paymentTypes = [
    "UPI",
    "Cash",
    "Card",
    "Net Banking",
    "Cheque",
    "EMI",
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
    
      dispatch(getexpense(company.companyName))
    }
  }, [company, dispatch]);


  useEffect(() => {
    if (company?.companyName) {
    
      dispatch(getexpcategory(company.companyName))
    }
  }, [company, dispatch]);


  console.log(157,company);






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

  const tabs = ["All Transactions ", "Pending", "Paid", "Cancelled"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);









  const [form, setForm] = useState({






    with_tax : false,
    expense_date:"",
    notes:"",


    category_id:"",
    expense_amount:"",


    vendor_id:"",
    supplier_invoice_date:null,
    supplier_invoice_no:null,
    items : [],

    rcm_enabled :false,


    is_paid : false,         


    payment : {
      bank_id:"1",
      payment_type:"",
      payment_notes:"",
      payment_date:""
    }





  });
  

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };


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


  const handelsubmit = (e) => {
    e.preventDefault()
   console.log(251,form);
   console.log(selectedcategory);
   console.log(paymentType);







    dispatch(addexpense(form, company.companyName))

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
          className={`w-full bg-white rounded-lg ${theme === "dark" ? "text-gray-100 bg-gray-900" : "text-gray-900"
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
                    className={`cursor-pointer pb-2 ${activeIndex === i ? "text-blue-400" : ""
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
                Actions <ChevronDown />
              </div>
              <div onClick={handleModel} className="px-4 h-[30px] cursor-pointer flex items-center text-white bg-blue-600 rounded-md text-sm font-medium">
                <Plus size={20} /> Create Expense
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


                      {/* TABLE WRAPPER */}

                      <table className="min-w-[900px] w-full text-sm">

                        {/* HEADER */}
                        <thead className="bg-gray-50 ">
                          <tr className="text-gray-500">
                            <th className="px-4 py-3 text-left font-medium">
                              <div className="flex items-center gap-1">
                                Amount

                                <i className="fa-solid fa-sort text-[10px]" />
                              </div>
                            </th>

                            <th className="px-4 py-3 text-left font-medium">
                              <div className="flex items-center gap-1">
                                Status
                                <i className="fa-solid fa-sort text-[10px]" />
                              </div>
                            </th>

                            <th className="px-4 py-3 text-left font-medium">
                              <div className="flex items-center gap-1">
                                Mode
                                <i className="fa-solid fa-sort text-[10px]" />
                              </div>
                            </th>

                            <th className="px-4 py-3 text-left font-medium">

                              Expense #

                            </th>

                            <th className="px-4 py-3">
                              Date / Created Time
                            </th>
                            <th className="px-4 py-3">
                              Vendor
                            </th>
                            <th className="px-4 py-3">
                              Description
                            </th>
                            <th className="px-4 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>
                          {expensedata?.map((exp, i) => (<tr className=" last:border-none hover:bg-gray-50 transition">

                            {/* ITEM */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">

                                <div>
                                  <p className="font-medium text-gray-900">
                                    {exp.total_amount}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Product <span className="text-indigo-600">00000000</span>
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* QTY */}
                            <td className="px-4 py-4 bg-red-50 font-semibold">
                              {exp.status}
                            </td>

                            {/* SELLING PRICE */}
                            <td className="px-4 py-4 font-semibold">
                              {exp.payment_type}
                            </td>

                            {/* PURCHASE PRICE */}
                            <td className="px-4 py-4">
                              {`Exp - ${exp.with_tax} `}
                            </td>
                            <td className="px-4 py-4">
                              {exp.created_at
                              }
                            </td>
                            <td className="px-4 py-4">
                              {exp.vendor_name
                              }
                            </td>
                            <td className="px-4 py-4">
                              {exp.des
                              }
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

                          </tr>))}

                        </tbody>

                      </table>



                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>



            { bankopen && (
  <div
    onClick={""}
    className="fixed inset-0 bg-black/70 z-80"
  />
)}

{/* Popup Container */}
<div
  className={`fixed top-0 right-0 h-full w-[550px] z-80 shadow-2xl
    transition-all duration-300 flex flex-col
    ${bankopen ? "translate-x-0" : "translate-x-full"}
    ${theme === "dark"
      ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
      : "bg-gray-50 text-gray-900"}
  `}
>
  {/* Header */}
  <div
    className={`flex items-center justify-between px-6 py-4 border-b flex-none
      ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}
    `}
  >
    <h2 className="text-lg font-semibold tracking-wide">Add Bank</h2>
    <button
      onClick={() => setBankopen(false)}
      className="w-8 h-8 flex items-center justify-center rounded-full
                 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      ✕
    </button>
    
  </div>

  {/* Body */}
  <div className="flex-1 overflow-y-auto p-6">
    <form   className="space-y-6">

    {/* Account Holder */}
<div>
  <label className="text-sm font-medium">Account Holder Name</label>
  <input
    name="account_holder_name"
    value={bankForm.account_holder_name}
    onChange={handleBankChange}
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* Account No */}
<div>
  <label className="text-sm font-medium text-red-600">* Account No</label>
  <input
    name="account_no"
    value={bankForm.account_no}
    onChange={handleBankChange}
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* Confirm Account No */}
<div>
  <label className="text-sm font-medium text-red-600">* Confirm Bank Account No</label>
  <input
    name="confirm_account_no"
    value={bankForm.confirm_account_no}
    onChange={handleBankChange}
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* IFSC */}
<div>
  <label className="text-sm font-medium text-red-600">* IFSC Code</label>
  <div className="flex gap-2">
    <input
      name="ifsc_code"
      value={bankForm.ifsc_code}
      onChange={handleBankChange}
      className="flex-1 p-2 border rounded-md"
    />
    <button
      type="button"
      className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100"
    >
      Fetch Bank Details
    </button>
  </div>
</div>

{/* Bank Name */}
<div>
  <label className="text-sm font-medium text-red-600">* Bank Name</label>
  <input
    name="bank_name"
    value={bankForm.bank_name}
    onChange={handleBankChange}
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* Branch */}
<div>
  <label className="text-sm font-medium text-red-600">* Branch Name</label>
  <input
    name="branch_name"
    value={bankForm.branch_name}
    onChange={handleBankChange}
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* UPI ID */}
<div>
  <label className="text-sm font-medium">
    UPI (Optional)
  </label>
  <div className="flex gap-2">
    <input
      name="upi_id"
      value={bankForm.upi_id}
      onChange={handleBankChange}
      placeholder="username@bank"
      className="flex-1 p-2 border rounded-md"
    />
    <button
      type="button"
      className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100"
    >
      Verify UPI ID
    </button>
  </div>
</div>

{/* UPI Number */}
<div>
  <label className="text-sm font-medium">
    UPI Number (Optional)
  </label>
  <input
    name="upi_number"
    value={bankForm.upi_number}
    onChange={handleBankChange}
    placeholder="GPay / PhonePe"
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* Opening Balance */}
<div>
  <label className="text-sm font-medium">
    Opening Balance (Optional)
  </label>
  <input
    name="opening_balance"
    value={bankForm.opening_balance}
    onChange={handleBankChange}
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* Notes */}
<div>
  <label className="text-sm font-medium">Notes</label>
  <textarea
    name="notes"
    value={bankForm.notes}
    onChange={handleBankChange}
    rows={3}
    placeholder="Beneficiary name, SWIFT code etc."
    className="w-full mt-1 p-2 border rounded-md"
  />
</div>

{/* Default Toggle */}
<div className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={bankForm.is_default}
    onChange={handleToggle}
    className="w-4 h-4"
  />
  <span className="text-sm">Set as default bank</span>
</div>


    </form>
  </div>

  {/* Footer */}
  <div
    className={`flex justify-end gap-3 px-6 py-4 border-t flex-none
      ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}
    `}
  >
    <button
      onClick={() => setBankopen(false)}
      className="px-5 py-2 rounded-lg border border-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
    >
      Cancel
    </button>

    <button onClick={handelbanksubmit}
      className="px-5 py-2 rounded-lg bg-blue-600 text-white
                 hover:bg-blue-700 shadow-md transition text-sm"
    >
      Save Bank
    </button>
  </div>
</div>



            {/* Background Overlay */}
            {isModelOpen &&

              <div onClick={handleModel} className="fixed inset-0 bg-black/70 z-40"></div>}

            {/* Settings Panel */}
            <div
              className={`fixed ${isModelOpen ? "right-0" : "right-[-650px]"} duration-300 transition-all top-0 h-full w-[650px] ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
                } z-50 shadow-xl flex flex-col`}
            >
              {/* Header */}
              <div
                className={`flex justify-between items-center p-4 pb-3 shadow-md flex-none ${theme === "dark" ? "bg-gray-900" : "bg-white"
                  }`}
              >
                <h2 className="text-lg font-semibold">Expenses</h2>
                <button onClick={handleModel}>✕</button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-5 text-sm">
                <form  className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 space-y-8">

                  {/* BASIC DETAILS */}
                  <div className="space-y-4">
                    <h2 className="text-base font-semibold text-gray-800 border-b pb-2">
                      Basic Details
                    </h2>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Expense Amount <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="customer_name"
                        value={form.expense_amount}
                        onChange={(e)=>{setForm({...form,expense_amount:e.target.value})}}
                        placeholder="Expense Amount"
                        className="w-full mt-1 outline-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>



                    <div className="">
                      <label className="text-sm font-medium  text-gray-700">Expense Date</label>
                      <input type="date"
                        name="expense_date"
                        value={form.expense_date}
                        
                        onChange={(e)=>{setForm({...form,expense_date:e.target.value})}}

                        className="w-full mt-1  rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                     focus:ring-2 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <input value={selectedcategory?.category_name} onClick={()=>{setOpenCategory((prev)=>!prev)}}
                        name="customer_name"
                        // value={form.customer_name}
                        // onChange={handleChange}
                        placeholder="Select ategory"
                        className="w-full mt-1 outline-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
<div className="relative w-full max-w-sm">

{/* Dropdown button */}


{/* Dropdown menu */}
{opencategory && (
  <div className="absolute z-50 mt-1 w-full bg-white  rounded-lg shadow-lg">

    {/* Categories */}
    <div className="max-h-48 overflow-y-auto">
      {expcadata?.map((ca) => (
        <div
          key={ca.id}
          onClick={() => {
            setSelectedcategory(ca),
            setOpenCategory(false);
            setForm({...form,category_id:ca.id})
          }}
          className="px-4 py-2 text-sm cursor-pointer 
            hover:bg-blue-50 transition"
        >
          {ca.category_name}
        </div>
      ))}
    </div>

    {/* Add Category */}
    <div
      onClick={() => {
        // setOpencategory(false);
        // openAddCategoryModal();
      }}
      className="px-4 py-2 text-sm font-medium text-blue-600 
        cursor-pointer hover:bg-blue-50 border-t"
    >
      + Add Category
    </div>

  </div>
)}
</div>


                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Notes <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="customer_name"
                          value={form.notes}
                          // onChange={handleChange}
                          onChange={(e)=>{setForm({...form,notes:e.target.value})}}
                          placeholder="Notes"
                          className="w-full outline-none mt-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>

                    </div>
                  </div>

                  {/* COMPANY DETAILS */}



                  <div className="space-y-4">
                    <h2 className="text-base font-semibold text-gray-800 border-b pb-2">
                      Totals
                    </h2>
                    <label
                      className="flex items-center justify-between gap-4 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium text-gray-700">TDS Applicable</span>

                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={istdsactive === true}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setIstdsactive(true);
                             
                            } else {
                              setIstdsactive(false);
                            }
                          }}
                          className="sr-only"
                        />

                        {/* Track */}
                        <div
                          className={`w-11 h-6 rounded-full transition ${istdsactive === true ? "bg-blue-600" : "bg-gray-300"
                            }`}
                        />

                        {/* Thumb */}
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${istdsactive === true ? "translate-x-5" : ""
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




                  </div>
                  <h3>Payments</h3>
                  <div className="flex flex-col gap-[15px]">
                    <label htmlFor="paid">Mark as Paid</label>
                    <label className="relative inline-flex items-center cursor-pointer ">

                      <input
                        id="paid"
                        type="checkbox"
                        checked={form.is_paid===true}
                        onChange={(e) => {e.target.checked?setForm({...form,is_paid:true}):setForm({...form,is_paid:false})}}
                        className="sr-only peer"
                      />

                      {/* Track */}
                      <div
                        className={`w-11 h-6 rounded-full transition ${form.is_paid===true ? "bg-blue-600" : "bg-gray-300"
                          }`}
                      />

                      {/* Thumb */}
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.is_paid===true  ? "translate-x-5" : ""
                          }`}
                      />
                    </label>
                  </div>



                  {/* <h3>payments</h3> */}
                {form.is_paid&&
                  <div className="relative w-full flex flex-col justify-between h-[300px]">
                   



                  <h3 className="font-semibold mb-2">Payment Type</h3>

                  <div className="flex flex-wrap items-center gap-2">
  {paymentTypes.map((type) => (
    <div key={type} className="relative group">
      
      {/* Tooltip */}

      {Array.isArray(banksdata)&&banksdata.length<0? <div
        className="absolute top-[-70px] left-1/2 -translate-x-1/2
        bg-black text-white text-xs px-3 py-2 rounded
        opacity-0 group-hover:opacity-100
        transition whitespace-nowrap z-50"
      >
        <p className="mb-2">Add bank details to enable</p>

        <button
          type="button"
          onClick={() => setBankopen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
        >
          Add Bank
        </button>
      </div>:""}
     

      {/* Payment Button */}
      <button
        type="button"
        onClick={() =>
          setForm({
            ...form,
            payment: {
              ...form.payment,
              payment_type: type,
            },
          })
        }
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${form.payment.payment_type===type?"bg-blue-600 text-white border-blue-600":"bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
            
          `}
      >
        {type}
      </button>
    </div>
  ))}
</div>



<h3>Payment Date</h3>
<input
  type="date"
  value={form.payment.payment_date}
  onChange={(e) =>
    setForm({
      ...form,
      payment: {
        ...form.payment,
        payment_date: e.target.value,
      },
    })
  }
  className="p-2 border border-gray-400 rounded-[8px]"
/>

<h3>Payment Notes</h3>

<textarea
  value={form.payment.payment_notes}
  onChange={(e) =>
    setForm({
      ...form,
      payment: {
        ...form.payment,
        payment_notes: e.target.value,
      },
    })
  }
  placeholder="Payment Notes"
  className="border p-2 w-full rounded-[5px] border-gray-400 outline-none"
  rows={4}
/>

<div className="relative w-full">
  <label htmlFor="bankid">Select Bank</label>
  {/* Input */}
  <input id="bankid"
    type="text"
    readOnly
    value={selectedbank?.account_holder_name || ""}
    onClick={() => setOpenbankdr(true)}
    placeholder="Select Bank"
    className="w-full p-2 border rounded-md cursor-pointer"
  />

  {/* Dropdown */}
  {openbankdr && (
    <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border">
      <div className="max-h-48 overflow-y-auto">
        {banksdata?.map((ba) => (
          <div
            key={ba.id}
            onClick={() => {
              setSelectedbank(ba);
              setForm({
                ...form,
                payment: {
                  ...form.payment,
                  bank_id: ba.id,
                },
              });
              setOpenbankdr(false);
            }}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 transition"
          >
            <p className="font-medium">{ba.account_holder_name}</p>
            <p className="text-xs text-gray-500">{ba.bank_name}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


                  </div>}
                
                

               

                </form>

              </div>

              {/* Footer */}
              <div
                className={`flex justify-end gap-2 p-4 shadow-md flex-none ${theme === "dark" ? "bg-gray-900" : "bg-white"
                  }`}
              >
                <button onClick={handleModel} className="px-4 py-2 bg-gray-200 rounded-md">
                  Close
                </button>
                <button onClick={(e)=>{
                  handelsubmit(e)
                }} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add Expense</button>
              </div>
            </div>

            {/* Info Section */}
            <motion.div
              variants={stagger}
              className={`w-full flex flex-col lg:flex-row items-center gap-10 p-6 py-[50px] ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
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

export default Expenses;
