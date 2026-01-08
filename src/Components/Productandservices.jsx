import React, { useState, useEffect,useRef, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";
import Offers from "./Offers";
import webinar from "../assets/images/webinar.svg";
import { toast, Toaster } from "sonner";
import {ChevronDown,Plus} from "lucide-react";
import {get_customer,getcategory,addcategory,addproduct,getproducts} from "../redux/action";
import { useDispatch,useSelector } from "react-redux";
import { Company } from "../Contexts/Company";


const Productandservices = ({ theme }) => {



 



  const [qty, setQty] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [stockValue, setStockValue] = useState(null);
  


 
  const dispatch = useDispatch();
  const customerdata = useSelector((state)=>state.customers.customers?.customers);
  console.log(16,customerdata);
  const categorydata = useSelector((state)=>state.category.category);
  const productdata = useSelector((state)=>state.products.products);
  console.log("pro",productdata);

  
  const { company } = useContext(Company);





   useEffect(() => {

    if (company.companyName) {
      dispatch(getproducts(company.companyName))
    }
   
   
     
   }, [dispatch,company])
   



  const [ismoredetails,seTismoredetails]=useState(false)

const generate10DigitNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};







  
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
  const [isshowinstore, setIsshowinstore] = useState(false);
  // const [isnotforsale, setIsnotforsale] = useState(false);
  const [opencategory, setOpencategory] = useState(false);
  const [categoryopen,setCategoryopen] = useState(false);
  const [selectedcategory,setSelectedcategory] = useState(null);

  const handleModel = () => setIsModelOpen((v) => !v);

  const tabs = ["Items", "Categories", "Groups","Price Lists","Deleted"];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef([]);







  
  

  const [form, setForm] = useState({

    type:"product",
    name:"",
    description:"",
    selling_price:"",
    purchase_price:"",
    price_includes_tax:null,
    primary_unit:"",
    additional_info:"",
    hsn_sac:"",
    barcode:"",
    category_id:"",
    image_url:"",
    opening_quantity:"",
    opening_purchase_price:"",
    opening_stock_value:"",


   

    discount_type:"",
    discount_value:"",
    low_stock_alert_at:"",
    show_online:null,
    not_for_sale:null

  });
  const [caform, setCaform] = useState({

    


    category_name:"",
        description:"",
        image_url:"",
        show_online : false, 
      

  });


  const handelcategorypost = (e)=>{
    
      dispatch(addcategory(caform,company.companyName))

  }




  useEffect(() => {
      dispatch(getcategory(company.companyName))
  
 
  }, [dispatch])
  



  
 


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

  console.log(149,form);


    //  dispatch(addproduct(form,company.companyName))


     const payload = {
      type: form.type,
      name: form.name,
      description: form.description,
      selling_price: form.selling_price,
      purchase_price: form.purchase_price,
      price_includes_tax: form.price_includes_tax===1?true:false,
      primary_unit: form.primary_unit
      ,
      additional_info: form.additional_info,
      hsn_sac: form.hsn_sac,
      barcode: form.barcode,
      category_id: form.category_id,
      image_url: form.image_url,
    
      opening_quantity:form.opening_quantity,
      opening_purchase_price:form.opening_purchase_price,
      opening_stock_value:form.opening_stock_value,
    
      discount_type: form.discount_type || "",
      discount_value: form.discount_value || "",
      low_stock_alert_at: form.low_stock_alert_at || "",
    
      show_online: form.show_online ?? null,
      not_for_sale: form.not_for_sale ?? null,
    };
    
   
 


    dispatch(addproduct(payload,company.companyName))
    
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
                <h1 className="text-[26px] font-bold">Products & Services</h1>
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
          <Plus size={20} /> New Products
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
  <thead className="bg-gray-50">
    <tr className="text-gray-500">
      <th className="px-4 py-3 text-left font-medium">Name</th>
      <th className="px-4 py-3 text-left font-medium">Qty</th>
      <th className="px-4 py-3 text-left font-medium">
        Selling Price (Disc %)
      </th>
      <th className="px-4 py-3 text-left font-medium">
        Purchase Price
      </th>
      <th className="px-4 py-3"></th>
    </tr>
  </thead>

  {/* BODY */}
  <tbody>
    {productdata?.map((product) => (
      <tr
        key={product.id}
        className=" hover:bg-gray-50 transition"
      >
        {/* ITEM */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Image / Initial */}
        
              <div className="w-9 h-9 rounded-full bg-indigo-200 flex items-center justify-center font-semibold text-xs">
                {product.name?.charAt(0)}
              </div>
           

            <div>
              <p className="font-medium text-gray-900">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">
                {product.type} ·{" "}
                <span className="text-indigo-600">
                  #{product.id}
                </span>
              </p>
            </div>
          </div>
        </td>

        {/* QTY */}
        <td
          className={`px-4 py-4 font-semibold ${
            product.quantity <= product.low_stock_alert_at
              ? "bg-red-50 text-red-600"
              : ""
          }`}
        >
          {product.quantity}
        </td>

        {/* SELLING PRICE */}
        <td className="px-4 py-4 font-semibold">
          ₹ {Number(product.selling_price).toFixed(2)}
          {product.discount_value && (
            <span className="text-xs text-green-600 ml-1">
              ({product.discount_value}%)
            </span>
          )}
        </td>

        {/* PURCHASE PRICE */}
        <td className="px-4 py-4">
          ₹ {Number(product.purchase_price).toFixed(2)}
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

     
   

      </motion.div>
    </AnimatePresence>
  </div>
</div>

</div>




{/* Overlay */}
{ categoryopen && (
  <div
    onClick={""}
    className="fixed inset-0 bg-black/70 z-80"
  />
)}

{/* Popup Container */}
<div
  className={`fixed top-0 right-0 h-full w-[650px] z-80 shadow-2xl
    transition-all duration-300 flex flex-col
    ${categoryopen ? "translate-x-0" : "translate-x-full"}
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
    <h2 className="text-lg font-semibold tracking-wide">Add Category</h2>
    <button
      onClick={() => setCategoryopen(false)}
      className="w-8 h-8 flex items-center justify-center rounded-full
                 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      ✕
    </button>
    
  </div>

  {/* Body */}
  <div className="flex-1 overflow-y-auto p-6">
    <form   className="space-y-6">

      {/* Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border dark:border-gray-700">
        <label className="text-sm font-medium block mb-3">
          Product Image
        </label>

        <div className="flex items-center gap-4">
          <div
            className="w-24 h-24 rounded-xl border-2 border-dashed
                       border-gray-300 dark:border-gray-600
                       flex items-center justify-center
                       text-sm font-medium text-gray-500
                       hover:border-blue-500 hover:text-blue-600
                       transition cursor-pointer"
          >
            + Upload
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            PNG / JPEG up to 3MB<br />
            <span className="text-gray-400">1024×1024 recommended</span>
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border dark:border-gray-700">
        <label htmlFor="category" className="text-sm font-medium block mb-2">
          Category Name
        </label>
        <input onChange={(e)=>{setCaform({...caform,category_name:e.target.value})}}
          id="category"
          type="text"
          value={caform.category_name}
          placeholder="Eg. Electronics"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                     bg-transparent px-4 py-2.5 text-sm
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border dark:border-gray-700">
        <label htmlFor="des" className="text-sm font-medium block mb-2">
          Description
        </label>
        <textarea  onChange={(e)=>{setCaform({...caform,description:e.target.value})}}
          id="des"
          rows={3}
          value={caform.description}
          placeholder="Short category description"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                     bg-transparent px-4 py-2.5 text-sm resize-none
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Show in Online Store</p>
            <p className="text-xs text-gray-500 mt-1">
              Visible in store and available for purchase
            </p>
          </div>

          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={caform.show_online}
              onChange={(e) => {e.target.checked?setCaform({...caform,show_online :true}):setCaform({...caform,show_online :false})}}
              className="sr-only"
            />

            <div
              className={`w-11 h-6 rounded-full transition
                ${caform.show_online===true ? "bg-green-600" : "bg-gray-300"}
              `}
            />
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                transition-transform
                ${caform.show_online===true ? "translate-x-5" : ""}
              `}
            />
          </label>
        </div>
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
      onClick={() => setCategoryopen(false)}
      className="px-5 py-2 rounded-lg border border-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
    >
      Cancel
    </button>

    <button onClick={handelcategorypost}
      className="px-5 py-2 rounded-lg bg-blue-600 text-white
                 hover:bg-blue-700 shadow-md transition text-sm"
    >
      Save Category
    </button>
  </div>
</div>




        
{isModelOpen && (
  <div
    onClick={handleModel}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
  />
)}

<div
  className={`
    fixed top-0 right-0 h-full w-[800px]
    transform transition-transform duration-300 ease-in-out
    ${isModelOpen ? "translate-x-0" : "translate-x-full"}
    ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
    z-50 shadow-2xl flex flex-col
  `}
>
  {/* HEADER */}
  <div
    className={`
      flex items-center justify-between
      px-6 py-4 border-b
      ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
      flex-none
    `}
  >
    <div>
      <h2 className="text-lg font-semibold">Add Item</h2>
      <p className="text-xs text-gray-500">
        Create product or service
      </p>
    </div>

    <button
      onClick={handleModel}
      className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
    >
      ✕
    </button>
  </div>

  {/* BODY */}
  <div className="flex-1 overflow-y-auto px-6 py-6">
    <form className="w-full space-y-6">

      {/* TABS */}
      <div className="flex gap-6  pb-2">
        <button className="text-sm font-medium border-b-2 border-blue-600 text-blue-600 pb-2">
          Details
        </button>
      </div>

      {/* PRODUCT / SERVICE */}
      <div className="relative w-[240px] p-1 rounded-lg  bg-gray-100 flex">
  
  {/* SLIDING INDICATOR */}
  <div
    className={`
      absolute top-1 bottom-1 w-1/2 rounded-md
      bg-blue-600 shadow-sm
      transition-all duration-200 ease-out
      ${form.type === "product" ? "left-1" : "left-[48%]"}
    `}
  />

  {/* PRODUCT */}
  <button
    type="button"
    onClick={(e) => {setForm({...form,type:"product"})}}
    className={`
      relative z-10 w-1/2 py-1.5 text-sm font-medium
      transition
      ${form.type === "product" ? "text-white" : "text-gray-600"}
    `}
  >
    Product
  </button>

  {/* SERVICE */}
  <button
    type="button"
    onClick={() =>{setForm({...form,type:"service"})} }
    className={`
      relative z-10 w-1/2 py-1.5 text-sm font-medium
      transition
      ${form.type === "service" ? "text-white" : "text-gray-600"}
    `}
  >
    Service
  </button>

</div>

      {/* PRODUCT NAME */}
      <div>
        <label className="text-sm font-medium">
         {form.type==="product"?"Product Name":"Service Name"}<span className="text-red-500">*</span>
        </label>
        <input onChange={(e)=>{setForm({...form,name:e.target.value})}}
          placeholder="Enter item name"
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm "
        />
      </div>

      {/* SELLING PRICE */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium">Selling Price</label>
          <input onChange={(e)=>{setForm({...form,selling_price:e.target.value})}}
            placeholder="₹ Enter selling price"
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-end text-sm text-blue-600 cursor-pointer">
          + Add GSTIN
        </div>
      </div>

      {/* PRIMARY UNIT */}
      <div>
        <label className="text-sm font-medium">Primary Unit</label>
        <input value={form.primary_unit}  onChange={(e)=>{setForm({...form,primary_unit:e.target.value})}} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
      </div>

      {/* MORE DETAILS */}
      <div
  className={`
    bg-orange-50 border border-orange-200 rounded-lg
    transition-all duration-500 overflow-hidden
    ${ismoredetails ? "max-h-[500px] p-5" : "max-h-[70px] p-4"}
  `}
>
  {/* HEADER */}
  <div
    onClick={() => seTismoredetails((prev) => !prev)}
    className="cursor-pointer flex items-start gap-2"
  >
    <ChevronDown
      size={18}
      className={`mt-0.5 transition-transform duration-300 ${
        ismoredetails ? "rotate-180" : ""
      }`}
    />
    <div>
      <p className="font-medium text-sm">More Details?</p>
      <p className="text-xs text-gray-600">
        Cess, Show Online Discount, Inventory tracking, Low stock alerts etc..
      </p>
    </div>
  </div>

  {/* CONTENT */}
  {ismoredetails && (
    <div className="mt-6 space-y-6 text-sm">

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6">

        {/* DISCOUNT */}
        <div>
          <label className="font-medium text-gray-700">Discount</label>
          <div className="mt-1 flex w-full max-w-md">
  <input onChange={(e)=>{setForm({...form,discount_value:e.target.value})}}
    type="number"
    placeholder="0"
    className="
      w-[200px]
      rounded-l-md
      border border-gray-300
      px-3 py-2
      text-sm
      focus:z-10
     
    "
  />

  <select  value={form.discount_type}  onChange={(e)=>{setForm({...form,discount_type:e.target.value})}}
    className=" outline-none
      rounded-r-md
      border border-l-0 border-gray-300
      bg-white
      px-3 py-2
      text-sm
     
    "
  >
    <option selected value="">Select Type</option>
    <option  value="percentage">Percentage (%)</option>
    <option value="amount">Amount (₹)</option>
  </select>
</div>

          
          <p className="text-xs text-gray-500 mt-1">
            Discount will be calculated based on the selected option. In Online Store,
            discount will be shown as per the selected option.
          </p>
        </div>

        {/* LOW STOCK ALERT */}
        
        <div>
          <label className="font-medium text-gray-700">
            Low Stock Alert at
          </label>
          <input onChange={(e)=>{setForm({...form,low_stock_alert_at:e.target.value})}}
            type="number"
            placeholder="0"
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            You will be notified once the stock reaches the minimum stock qty. (BETA)
          </p>
        </div>

      </div>

      {/* TOGGLES */}
      <div className="grid grid-cols-2 gap-6">

        {/* SHOW ONLINE STORE */}
        <div>
  <p className="font-medium text-gray-700">Show in Online Store</p>

  <div className="flex items-center gap-3 mt-2">
  <label className="relative cursor-pointer">
    <input
      type="checkbox"
      checked={form.show_online}
      onChange={(e) => {e.target.checked?setForm({...form,show_online:true}):setForm({...form,show_online:false})}}
      className="sr-only peer"
    />

    {/* Track */}
    <div
      className={`
        w-10 h-5 rounded-full transition
        ${form.show_online ? "bg-green-600" : "bg-gray-300"}
      `}
    />

    {/* Thumb */}
    <div
      className={`
        absolute top-0.5 left-0.5
        w-4 h-4 bg-white rounded-full shadow
        transition-transform
        ${form.show_online ? "translate-x-5" : ""}
      `}
    />
  </label>

  <span className="text-xs text-gray-600">
    Hides the item for sale and shows only while making a purchase
  </span>
</div>
</div>


        {/* NOT FOR SALE */}
        <div>
  <p className="font-medium text-gray-700">Not For Sale</p>

  <div className="flex items-center gap-3 mt-2">
  <label className="relative cursor-pointer">
    <input
      type="checkbox"
      checked={form.not_for_sale}
      onChange={(e) => {e.target.checked?setForm({...form,not_for_sale:true}):setForm({...form,not_for_sale:false})}}
      className="sr-only peer"
    />

    {/* Track */}
    <div
      className={`
        w-10 h-5 rounded-full transition
        ${form.not_for_sale ? "bg-gray-600" : "bg-gray-300"}
      `}
    />

    {/* Thumb */}
    <div
      className={`
        absolute top-0.5 left-0.5
        w-4 h-4 bg-white rounded-full shadow
        transition-transform
        ${form.not_for_sale ? "translate-x-5" : ""}
      `}
    />
  </label>

  <span className="text-xs text-gray-600">
    Hides the item for sale and shows only while making a purchase
  </span>
</div>

</div>


      </div>

    </div>
  )}
</div>


      {/* ADDITIONAL INFO */}
      <div className="border rounded-xl p-5 space-y-5">
        <p className="text-sm font-semibold">
          Additional Information
          <span className="ml-2 text-xs text-gray-400">OPTIONAL</span>
        </p>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium">HSN/SAC</label>
            <input onChange={(e)=>{setForm({...form,hsn_sac:e.target.value})}} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
            <p className="text-xs text-blue-600 mt-1 cursor-pointer">
              Check GST approved HSN/SAC codes
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Purchase Price</label>
            <div className="flex mt-1">
              <input onChange={(e)=>{setForm({...form,purchase_price:e.target.value})}}  className="flex-1 rounded-l-md border px-3 py-2 text-sm" />
              <select  onChange={(e)=>{setForm({...form,price_includes_tax
:e.target.value})}}                                                                                                                                                         className="rounded-r-md border border-l-0 px-3 py-2 text-sm">
                <option value="" >Select</option>
                <option value={1} >with Tax</option>
                <option value={0} >without Tax</option>
              </select>
            </div>
          </div>
        
        </div>
      

        <div className="flex justify-between ">
          <div>
            <label className="text-sm font-medium">Barcode</label>
            <div className="flex gap-2 mt-1">
              <input value={form.barcode} onChange={(e)=>{setForm({...form,barcode:e.target.value})}} className="flex-1 rounded-md border px-3 py-2 text-sm" />
              <button
  type="button"
  onClick={() =>
    setForm((prev) => ({
      ...prev,
      barcode: generate10DigitNumber(),
    }))
  }
  className="px-3 py-2 border rounded-md text-sm"
>
  Auto Generate
</button>

            </div>
          </div>
          <div className="relative">
  <label className="text-sm font-medium text-gray-700">
    Category
  </label>

  {/* Input Trigger */}
  <input value={selectedcategory}
    onClick={() => setOpencategory((prev) => !prev)}
    className="mt-1 w-full flex items-center justify-between
               rounded-lg border border-gray-300 bg-white
               px-4 py-2.5 text-sm cursor-pointer
               hover:border-blue-500 focus:ring-2 focus:ring-blue-500
               transition"
  >
  
    
  </input>

  {/* Dropdown */}
  <div
    className={`absolute z-50 mt-2 w-full overflow-hidden
      rounded-xl border border-gray-200 bg-white shadow-lg
      transform transition-all duration-200
      ${opencategory
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"}
    `}
  >
    {/* Category List */}
    <div className="max-h-48 overflow-y-auto">
      {categorydata.length > 0 ? (
        categorydata.map((ca) => (
          <div onClick={()=>{setSelectedcategory(ca.category_name),setForm({...form,category_id:ca.id}),setOpencategory(false)}}
            key={ca.id}
            className="px-4 py-2.5 text-sm text-gray-700
                       hover:bg-blue-50 hover:text-blue-600
                       cursor-pointer transition"
          >
            {ca.category_name}
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-gray-400">
          No categories found
        </div>
      )}
    </div>

    {/* Add Category */}
    <div className="border-t bg-gray-50 p-3">
      <button
        type="button"
        onClick={() => setCategoryopen(true)}
        className="w-full text-sm font-medium text-blue-600
                   hover:text-blue-700 hover:bg-blue-50
                   rounded-lg py-2 transition"
      >
        + Add Category
      </button>
    </div>
  </div>
</div>

        </div>
      

        <div>
          <label className="text-sm font-medium">Product Image</label>
          <div className="mt-2 w-24 h-24 border-dashed border rounded-lg flex items-center justify-center text-sm cursor-pointer">
            + Upload
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PNG/JPEG up to 3MB • 1024×1024 recommended
          </p>
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea onChange={(e)=>{setForm({...form,description:e.target.value})}}
            rows={4}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Add product description..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div>
          <label htmlFor="">
          Opening Stock OPTIONAL
          </label>


        </div>
        <div className="bg-white p-6 rounded-lg w-full">
  <div className="grid grid-cols-2 gap-6">
    {/* Opening Quantity */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        Opening Quantity
      </label>

      <input
        type="number"
        value={form.opening_quantity}
        placeholder="0"
        onChange={(e) => {setForm({...form,opening_quantity:e.target.value})}}
        className={`p-2 rounded border outline-none ${
          form.opening_quantity < 0 ? "border-red-500" : "border-gray-300"
        }`}
      />

      {form.opening_quantity < 0 && (
        <p className="text-xs text-red-500">
          Quantity cannot be negative
        </p>
      )}

      <p className="text-xs text-gray-400">
        *Quantity of the product available in your existing inventory
      </p>
    </div>

    {/* Purchase Price */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        Opening Purchase Price (with tax)
      </label>

      <input
        type="number"
        placeholder="0"
        value={form.opening_purchase_price}
        onChange={(e) => {setForm({...form,opening_purchase_price:e.target.value})}}
        className="p-2 rounded border border-gray-300 outline-none"
      />
    </div>
  </div>

  {/* Stock Value */}
  <div className="mt-6">
    <label className="text-sm font-medium text-gray-700">
      Opening Stock Value (with tax)
    </label>

    <input
      type="number"
      value={form.opening_quantity*form.opening_purchase_price}
   placeholder="0"
   onChange={(e) => {setForm({...form,opening_stock_value:e.target.value})}}
      
      className="mt-1 p-2 w-full rounded border border-gray-300 bg-gray-100 "
    />
  </div>
</div>

      
      </div>

    </form>
  </div>

  {/* FOOTER */}
  <div
    className={`
      flex justify-end gap-3 px-6 py-4 border-t
      ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
      flex-none
    `}
  >
    <button
      onClick={handleModel}
      className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      Cancel
    </button>
    <button onClick={handelsubmit} className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
      Add Item
    </button>
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
                  + New Products
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Productandservices;
