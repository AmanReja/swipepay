import { React, useEffect, useContext, useState } from "react";
import Hdfc from "../assets/images/HDFC.png";
import Chart from "./Chart";
import { toast ,Toaster } from "sonner";
import { useParams, useLocation } from "react-router-dom";
import bg3 from "../assets/images/bg-3.png";
import Subfooter from "./Subfooter";
import { useSelector, useDispatch } from "react-redux";
import { getall_payoutlog_data, getall_wallet_company_data, get_vertualaccountdetails, get_collections, collection_report, Payout_report, summaryreport } from "../redux/action";
import { BadgeCheck, ArrowDownLeft, ChevronDown, ArrowUpRight, CreditCard,Check } from "lucide-react"
import Chart2 from "./Chart2";

import { Theme } from "../Contexts/Theme";



const Summery = () => {
  const { theme, setTheme } = useContext(Theme)
  const [daterange, setDaterange] = useState("")
  const [open, setOpen] = useState(false);
  const [selected,setSelected] = useState("")
  const [selectedmonths,setSelectedmonths] = useState("1")
  const [barselectedmonths,setBarselectedmonths] = useState("1")



  console.log(22, daterange);
  console.log(27, selectedmonths);




  const dispatch = useDispatch();



  const walletdata = useSelector((state) => state.walletcompany.walletcompany.total);
  const vaaccountdata = useSelector((state) => state.vaaccount.vaaccount);


  const summaryReport = useSelector((state) => state.summarydata.summarydata);
  console.log(36, summaryReport);















  useEffect(() => {
    dispatch(getall_payoutlog_data())
    dispatch(getall_wallet_company_data())
    dispatch(get_vertualaccountdetails())
    dispatch(get_collections())
    dispatch(summaryreport(selected))

  }, [dispatch, selected,daterange]);




  useEffect(() => {
    const shouldShow = localStorage.getItem("showLoginToast");
  
    if (shouldShow === "true") {
      toast.success("🚀 Login Successful!", {
        description: "Welcome back to BusyBox!",
        duration: 2500,
      });
  
     
        localStorage.removeItem("showLoginToast");
      
    }
  }, []);





  const icons = [
    {
      icon: <ArrowUpRight size={44} className={`${theme === "dark" ? "text-white" : "text-gray-600"}`} />,
      num: summaryReport?.totalPayoutCount

      ,
      text: "Payouts",
      deg: "-50deg",
    },
    {
      icon: <ArrowDownLeft size={44} className={`${theme === "dark" ? "text-white" : "text-gray-600"}`} />,
      num: summaryReport?.totalCollectionCount

      ,
      text: "Collection",
      deg: "130deg",
    },
    {
      icon: <CreditCard size={44} className={`${theme === "dark" ? "text-white" : "text-gray-600"}`} />,
      num: 0,
      text: "Cards Created",
      deg: "0deg",
    },
    {
      icon: <BadgeCheck size={44} className={`${theme === "dark" ? "text-white" : "text-gray-600"}`} />,
      num: 0,
      text: "Identity Verified",
      deg: "0deg",
    },
  ];



  const opt = [
    { value: "today" },
    { value: "yesterday" },
    { value: "week" },
    { value: "month" },
   

  ];


  const handelselectopen = () => {
    setOpen((prev) => !prev)
  }

  const handleSelect =(opt)=>{
     setSelected(opt.value)
  }


console.log(141,selected);



  return (

    <>
     <Toaster
  position="top-right"
  richColors
  closeButton
  toastOptions={{
    style: {
      borderRadius: "12px",
      fontSize: "14px",
      padding: "12px 16px",
      background: "linear-gradient(135deg, #654ea3, #4e54c8)",
      color: "#fff",
      boxShadow:
        "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255,255,255,0.1)",
      backdropFilter: "blur(8px)",
    },
    className: "modern-toast",
  }}
/>

      <div
        className={`w-[100%] 2xl:h-[85%] xl:h-[80%] h-[78%] flex flex-col 
  ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
      >
        <main className="w-full h-full flex flex-col overflow-y-scroll">

          <div className="w-full sm:h-[50px] h-[90px] sm:flex-row flex-col px-[20px] flex items-center justify-between mt-[2px] sm:mt-[30px]">
            <h1
              className={`text-[23px] font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
            >
              Dashboard Summary
            </h1>

            <div className="h-full w-full sm:w-[560px] gap-[10px] flex">

          

<div className="relative w-[180px]">
  
  <button
    onClick={() => handelselectopen()}
    className=" flex justify-between w-full items-center px-4 py-2 bg-white rounded-xl border-[1px] border-gray-300 transition-all"
  >
    <span className={`${theme==="dark"?"text-black":""}`}>{selected ? selected : "Select date"}</span>
    <ChevronDown
      className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
    />
  </button>

  
  {open && (
    <ul
      onClick={() => handelselectopen()}
      className={`absolute left-0 right-0 mt-2 ${theme==="dark"?"text-black ":""} bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto z-10 animate-fade-in`}
    >
      {opt.map((option, i) => (
        <li
          key={i}
          onClick={() => handleSelect(option)}
          className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <span>{option.value}</span>
          {selected === option.value && (
            <Check className="w-4 h-4 text-blue-500" />
          )}
        </li>
      ))}
    </ul>
  )}
</div>


              <div
                className={`border-dashed rounded flex flex-col w-[145px]  border-[1px] text-center gap-[2px] p-[5px] 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
              >
                <p
                  className={`text-[12px] font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                  ₹ {walletdata}
                </p>
                <p
                  className={`text-[12px] font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Wallet Balance
                </p>
              </div>


              <div
                className={`border-dashed rounded flex flex-col w-[145px]  border-[1px] text-center gap-[2px] p-[5px] 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
              >
                <p
                  className={`text-[12px] font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                  ₹ 0
                </p>
                <p
                  className={`text-[12px] font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Unsettled
                </p>
              </div>


              <div
                className={`border-dashed rounded flex flex-col w-[145px] text-center gap-[2px]  border-[1px] p-[5px] 
          ${theme === "dark" ? "border-gray-600" : "border-gray-400"}`}
              >
                <p
                  className={`text-[12px] font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                >
                  ₹ 0
                </p>
                <p
                  className={`text-[12px] font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Settled
                </p>
              </div>
            </div>
          </div>


          <div className="w-full h-[676px] justify-between sm:flex-row gap-[10px] flex-col flex mt-[5px] p-2 px-[20px]">

            <div className="bg-gradient-to-r hover:translate-y-[-5px] duration-300 from-violet-500 to-indigo-500 text-white p-8 rounded-lg shadow-lg w-full sm:w-[590px] h-full">
              <div className="w-full h-[60px] font-semibold mb-4 flex items-center gap-[20px]">
                <div className="w-[70%]">
                  <h1 className="text-[20px]">Virtual Account</h1>
                  <p className="text-blue-200 font-normal text-[14px]">HDFC Bank</p>
                </div>
                <div
                  className={`border h-[60px] w-[22%] rounded-[5px] p-1 flex justify-center items-center 
            bg-white`}
                >
                  <img
                    className="object-contain w-[50px] h-[50px]"
                    src={Hdfc}
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full h-[60px]">
                <p className="font-semibold text-[12px] text-gray-100">
                  Account Number
                </p>
                <h1 className="font-bold text-[18px] text-white">
                  {vaaccountdata[0]?.account_number}
                </h1>
              </div>

              <div className="w-full h-[60px]">
                <p className="font-semibold text-[12px] text-gray-100">IFSC Code</p>
                <h1 className="font-bold text-[18px] text-white">
                  {vaaccountdata[0]?.ifsc_code}
                </h1>
              </div>
            </div>


            <div className="flex w-full z-0 sm:w-[60%] h-full">
              <div className="grid grid-cols-2 grid-rows-2 text-left w-full h-full gap-4">
                {icons.map(({ icon, num, text }) => (
                  <div
                    key={text}
                    style={{
                      backgroundImage: `url(${bg3})`,
                      backgroundSize: "200px"
                    }}
                    className={`flex bg-no-repeat  bg-left-top bg-contain flex-col items-center justify-between rounded-xl p-4 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
              ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
                  >
                    <div className="w-full flex justify-center items-center h-[40%]">
                      {icon}
                    </div>
                    <div className="w-full text-center h-[60%]">
                      <h1
                        className={`text-4xl font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"
                          }`}
                      >
                        {num}
                      </h1>
                      <p
                        className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                      >
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <section className="w-full flex flex-col sm:flex-row gap-[20px] sm:min-h-[400px] sm:h-[400px] px-[20px]">
          <div className="rounded-2xl flex w-full sm:w-[50%] h-[100%] flex-col justify-center items-center">
              <header
                className={`w-full h-[18%] flex justify-between items-center rounded-t-2xl shadow-sm p-4 border 
          ${theme === "dark" ? "border-gray-700 bg-gradient-to-r from-gray-700 to-gray-800" : "border-gray-200 bg-gradient-to-r from-sky-50 to-sky-100"}`}
              >
                <h1
                  className={`text-[20px]  font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                >
                  Collections
                </h1>
                <select value={barselectedmonths}
                  className={`text-[12px] rounded-lg w-[130px] outline-none px-[12px] border py-[8px] shadow-sm 
            ${theme === "dark" ? "text-gray-300 border-gray-600 bg-gray-700" : "text-gray-600 border-gray-300 bg-white"}`}
                onChange={(e)=>{setBarselectedmonths(e.target.value)}}  >
                  <option selected value="1">1 month</option>
                  <option value="2">2 month</option>
                  <option value="6">6 month</option>
                  <option  value="12">
                    12 month
                  </option>
                </select>
              </header>
              <div
                className={`rounded-bl-2xl rounded-br-2xl h-[80%] px-[5px] border w-full flex justify-center items-center shadow-xl 
          ${theme === "dark" ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white border-gray-300 shadow-sky-100"}`}
              >
                <Chart2 barselectedmonths={barselectedmonths} />
              </div>
            </div>


            <div className="rounded-2xl flex w-full sm:w-[50%] h-[100%] flex-col justify-center items-center">
              <header
                className={`w-full h-[18%] flex justify-between items-center rounded-t-2xl shadow-sm p-4 border 
          ${theme === "dark" ? "border-gray-700 bg-gradient-to-r from-gray-700 to-gray-800" : "border-gray-200 bg-gradient-to-r from-sky-50 to-sky-100"}`}
              >
                <h1
                  className={`text-[20px]  font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                >
                  Payouts
                </h1>
                <select value={selectedmonths}
                  className={`text-[12px] rounded-lg w-[130px] outline-none px-[12px] border py-[8px] shadow-sm 
            ${theme === "dark" ? "text-gray-300 border-gray-600 bg-gray-700" : "text-gray-600 border-gray-300 bg-white"}`}
                onChange={(e)=>{setSelectedmonths(e.target.value)}}  >
                  <option selected value="1">1 month</option>
                  <option value="2">2 month</option>
                  <option value="6">6 month</option>
                  <option  value="12">
                    12 month
                  </option>
                </select>
              </header>
              <div
                className={`rounded-bl-2xl rounded-br-2xl h-[80%] px-[5px] border w-full flex justify-center items-center shadow-xl 
          ${theme === "dark" ? "bg-gray-800 border-gray-700 shadow-gray-900" : "bg-white border-gray-300 shadow-sky-100"}`}
              >
                <Chart selectedmonths={selectedmonths} />
              </div>
            </div>
          </section>
        </main>
      </div>


    </>
  );
};

export default Summery;
